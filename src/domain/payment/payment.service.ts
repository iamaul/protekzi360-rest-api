import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { PaymentMethodEntity, UserPaymentEntity } from '../../typeorm';
import { LessThan, Repository } from 'typeorm';
import {
  CreateUserPaymentBodyRequest,
  UserPaymentDTO,
} from '../user/dto/user-payment.dto';
import { MidtransService } from '../../midtrans/midtrans.service';
import { MidtransChargeRequestDTO } from './dto/midtrans-charge.dto';
import { PaymentType } from '../../common/enum';
import { ExtendedRequest } from '../../common/extended-request';
import { PaymentStatus } from '../../common/enum';
import { CreatePaymentResponse } from './dto/payment.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentMethodEntity)
    private readonly paymentMethodRepo: Repository<PaymentMethodEntity>,
    @InjectRepository(UserPaymentEntity)
    private readonly paymentRepo: Repository<UserPaymentEntity>,
    private readonly midtransService: MidtransService,
  ) {}

  async getPaymentMethodList(): Promise<PaymentMethodEntity[]> {
    return this.paymentMethodRepo.find();
  }

  async createPayment(
    payload: CreateUserPaymentBodyRequest,
    request: ExtendedRequest,
  ): Promise<CreatePaymentResponse> {
    try {
      // Get the uid from the request's metadata
      const uuid = uuidv4();
      const uid = request.uid;

      const paymentMethod = await this.paymentMethodRepo.findOne({
        where: {
          id: payload.paymentMethodId,
        },
      });

      const createdPayment = this.paymentRepo.create({
        id: uuid,
        paymentMethodId: payload.paymentMethodId,
        userId: uid,
        amount: payload.amount,
      });

      const chargeParams = await this.midtransChargeApiParams(
        paymentMethod.paymentName,
        payload.amount,
        createdPayment.id,
      );

      const midtransResponse = await this.midtransService.coreApi.charge(
        JSON.stringify(chargeParams),
      );

      if (paymentMethod.paymentName === 'Permata') {
        createdPayment.va_name = `Midtrans ${paymentMethod.paymentName}`;
        createdPayment.va_code = midtransResponse.permata_va_number;
      } else if (paymentMethod.paymentName === 'Mandiri') {
        createdPayment.va_name = `Midtrans ${paymentMethod.paymentName}`;
        createdPayment.va_code = midtransResponse.bill_key;
      } else {
        createdPayment.va_name = `Midtrans ${midtransResponse.va_numbers[0].bank.toUpperCase()}`;
        createdPayment.va_code = midtransResponse.va_numbers[0].va_number;
      }
      createdPayment.status =
        midtransResponse.transaction_status as PaymentStatus;
      createdPayment.expiredAt = midtransResponse.expiry_time;

      const payment = await this.paymentRepo.save(createdPayment);

      const result: CreatePaymentResponse = {
        id: payment.id,
        paymentMethod: {
          name: paymentMethod.paymentName,
          logo: paymentMethod.paymentLogo,
        },
        va_name: payment.va_name,
        va_code: payment.va_code,
        amount: payment.amount,
        status: payment.status,
        expiredAt: payment.expiredAt,
      };
      return result;
    } catch (error) {
      throw new BadRequestException(
        `An error occurred while executing transaction from Midtrans: ${error.message}`,
      );
    }
  }

  async findById(id: string): Promise<UserPaymentDTO> {
    if (!id) throw new BadRequestException('Payment id is required');

    const result = this.paymentRepo.findOne({
      where: { id },
    });

    if (!result) {
      // Handle the case when no payment is found
      throw new NotFoundException('Payment not found');
    }

    return result;
  }

  async save(payment: UserPaymentDTO): Promise<UserPaymentDTO> {
    const result = await this.paymentRepo.save(payment);
    return result;
  }

  async findPaymentById(id: string): Promise<CreatePaymentResponse> {
    if (!id) throw new BadRequestException('Payment id is required');

    const payment = await this.paymentRepo.findOne({
      where: { id },
    });

    if (!payment) {
      // Handle the case when no payment is found
      throw new NotFoundException('Payment not found');
    }

    const paymentMethod = await this.paymentMethodRepo.findOne({
      where: { id: payment.paymentMethodId },
    });

    const result: CreatePaymentResponse = {
      id: payment.id,
      paymentMethod: {
        name: paymentMethod.paymentName,
        logo: paymentMethod.paymentLogo,
      },
      va_name: payment.va_name,
      va_code: payment.va_code,
      amount: payment.amount,
      status: payment.status as PaymentStatus,
      expiredAt: payment.expiredAt,
    };

    return result;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async checkPaymentStatus() {
    console.log('[SCHEDULER] Checking payment status every minute');

    const payments = await this.paymentRepo.find({
      where: {
        status: PaymentStatus.PENDING,
        expiredAt: LessThan(new Date()),
      },
    });

    if (payments.length > 0) {
      payments.forEach(async (payment) => {
        const midtransResponse =
          await this.midtransService.coreApi.transaction.status(payment.id);

        switch (midtransResponse.transaction_status) {
          case 'settlement':
            payment.status = PaymentStatus.COMPLETED;
            break;
          case 'expire':
            payment.status = PaymentStatus.EXPIRED;
            break;
          case 'cancel':
            payment.status = PaymentStatus.CANCELED;
            break;
          case 'deny':
            payment.status = PaymentStatus.FAILED;
            break;
          default:
            break;
        }

        const updatedPayment = await this.paymentRepo.save(payment);
        console.log(
          `[SCHEDULER] Updated payment status on ${new Date().toLocaleString()} with result: ${
            updatedPayment.status
          }`,
        );
      });
    }
  }

  private midtransChargeApiParams(
    paymentName: string,
    amount: number,
    orderId: string,
  ): Promise<MidtransChargeRequestDTO> {
    const transactionDetails = {
      order_id: orderId,
      gross_amount: amount,
    };

    let chargeRequest: MidtransChargeRequestDTO;

    switch (paymentName) {
      case 'BNI':
        chargeRequest = {
          payment_type: PaymentType.BANK_TRANSFER,
          transaction_details: { ...transactionDetails },
          bank_transfer: {
            bank: 'bni',
          },
        };
        break;
      case 'BRI':
        chargeRequest = {
          payment_type: PaymentType.BANK_TRANSFER,
          transaction_details: { ...transactionDetails },
          bank_transfer: {
            bank: 'bri',
          },
        };
        break;
      case 'Mandiri':
        chargeRequest = {
          payment_type: PaymentType.E_CHANNEL,
          transaction_details: { ...transactionDetails },
        };

        chargeRequest.echannel = {
          bill_info1: 'Payment for ',
          bill_info2: 'Protekzi360 Premium',
        };
        break;
      case 'Permata':
        chargeRequest = {
          payment_type: PaymentType.PERMATA,
          transaction_details: { ...transactionDetails },
        };
        break;
      default:
        new BadRequestException('Payment method not found');
        return Promise.reject('Payment method not found');
    }

    return Promise.resolve(chargeRequest);
  }
}
