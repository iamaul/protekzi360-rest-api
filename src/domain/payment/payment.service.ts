import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { PaymentMethodEntity, UserPaymentEntity } from '../../typeorm';
import { Repository } from 'typeorm';
import { UserPaymentDTO } from '../user/dto/user-payment.dto';
import { MidtransService } from '../../midtrans/midtrans.service';
import { MidtransChargeRequestDTO } from './dto/midtrans-charge.dto';
import { PaymentType } from '../../common/enum';
import { ExtendedRequest } from '../../common/extended-request';

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
    payload: UserPaymentDTO,
    amount: number,
    request: ExtendedRequest,
  ): Promise<UserPaymentDTO> {
    // Get the uid from the request's metadata
    const uid = request.uid;

    const paymentMethod = await this.paymentRepo.findOne({
      relations: ['paymentMethod'],
      where: {
        paymentMethod: {
          id: payload.paymentMethod.id,
        },
      },
    });

    const createdPayment = this.paymentRepo.create({
      paymentMethod: {
        id: payload.paymentMethod.id,
      },
      user: {
        id: uid,
      },
      amount,
      code: Date.now().toString(),
      expiredAt: dayjs().add(1, 'hour').toDate(),
    });

    const params = this.midtransChargeApiParams(
      paymentMethod.paymentMethod.paymentName,
      amount,
      createdPayment.id,
    );
    console.log(`midtransChargeApiParams: ${params}`);

    const midtransResponse = await this.midtransService.coreApi(params);

    createdPayment.meta = midtransResponse;

    const payment = await this.paymentRepo.save(createdPayment);
    return payment;
  }

  private midtransChargeApiParams(
    paymentName: string,
    amount: number,
    orderId: string,
  ): Promise<MidtransChargeRequestDTO> {
    const chargeRequest: MidtransChargeRequestDTO = {
      payment_type: PaymentType.BANK_TRANSFER,
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
    };

    switch (paymentName) {
      case 'BNI':
        chargeRequest.payment_type = PaymentType.BANK_TRANSFER;
        chargeRequest.bank_transfer = {
          bank: 'bni',
        };
        break;
      case 'BRI':
        chargeRequest.payment_type = PaymentType.BANK_TRANSFER;
        chargeRequest.bank_transfer = {
          bank: 'bri',
        };
        break;
      case 'Mandiri':
        chargeRequest.payment_type = PaymentType.E_CHANNEL;
        chargeRequest.echannel = {
          bill_info1: 'Payment:',
          bill_info2: 'Online purchase',
        };
        break;
      case 'Permata':
        chargeRequest.payment_type = PaymentType.PERMATA;
        break;
      default:
        console.error('Payment method not found');
        break;
    }

    return Promise.resolve(chargeRequest);
  }
}
