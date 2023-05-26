import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OPEN_API_CONSTANT } from '../../common/open-api.constant';
import { PaymentService } from './payment.service';
import { CreatePaymentResponse, PaymentMethodDTO } from './dto/payment.dto';
import { PaymentMethodEntity } from '../../typeorm';
import { AuthGuard } from '../../guards/auth.guard';
import {
  CreateUserPaymentBodyRequest,
  UserPaymentDTO,
} from '../user/dto/user-payment.dto';
import { MidtransService } from '../../midtrans/midtrans.service';
import { PaymentStatus } from '../../common/enum';

const {
  modules: {
    PAYMENT: {
      tag: PAYMENT_TAG,
      endPoints: { GET_PAYMENT_METHOD, CREATE_PAYMENT, GET_PAYMENT },
    },
  },
} = OPEN_API_CONSTANT;

@ApiTags(PAYMENT_TAG)
@ApiBearerAuth()
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly midtransService: MidtransService,
  ) {}

  @Get('/method')
  @HttpCode(200)
  @ApiOperation({
    summary: GET_PAYMENT_METHOD.ApiOperation.title,
    description: GET_PAYMENT_METHOD.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: GET_PAYMENT_METHOD.ApiOkResponse.description,
    type: PaymentMethodDTO,
  })
  @ApiBadRequestResponse({
    description: GET_PAYMENT_METHOD.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: GET_PAYMENT_METHOD.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description: GET_PAYMENT_METHOD.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  getPaymentMethodList(): Promise<PaymentMethodEntity[]> {
    return this.paymentService.getPaymentMethodList();
  }

  @Post('')
  @HttpCode(200)
  @ApiOperation({
    summary: CREATE_PAYMENT.ApiOperation.title,
    description: CREATE_PAYMENT.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: CREATE_PAYMENT.ApiOkResponse.description,
  })
  @ApiBadRequestResponse({
    description: CREATE_PAYMENT.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: CREATE_PAYMENT.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description: CREATE_PAYMENT.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  createPayment(
    @Body() payment: CreateUserPaymentBodyRequest,
    @Req() request,
  ): Promise<CreatePaymentResponse> {
    return this.paymentService.createPayment(payment, request);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: GET_PAYMENT.ApiOperation.title,
    description: GET_PAYMENT.ApiOperation.summary,
  })
  @ApiOkResponse({
    description: GET_PAYMENT.ApiOkResponse.description,
  })
  @ApiBadRequestResponse({
    description: GET_PAYMENT.ApiBadRequestResponse.description,
  })
  @ApiUnauthorizedResponse({
    description: GET_PAYMENT.ApiUnauthorized.description,
  })
  @ApiInternalServerErrorResponse({
    description: GET_PAYMENT.ApiInternalServerErrorResponse.description,
  })
  @UseGuards(AuthGuard)
  getPayment(@Param('id') id: string): Promise<UserPaymentDTO> {
    return this.paymentService.findById(id);
  }

  @Post('/notification')
  async notification(@Req() request: RawBodyRequest<Request>): Promise<any> {
    try {
      if (!request.rawBody) {
        throw new BadRequestException('Request body is empty.');
      }
      const json = request.rawBody.toString();
      const statusResponse =
        await this.midtransService.coreApi.transaction.notification(json);
      const payment = await this.paymentService.findById(
        statusResponse.order_id,
      );

      if (statusResponse.transaction_status === 'capture') {
        if (statusResponse.fraud_status === 'challenge') {
          // TODO set transaction status on your database to 'challenge'
          payment.status = PaymentStatus.CHALLENGED;
        } else if (statusResponse.fraud_status === 'accept') {
          payment.status = PaymentStatus.COMPLETED;
        }
      } else if (statusResponse.transaction_status === 'settlement') {
        // TODO set transaction status on your database to 'success'
        payment.status = PaymentStatus.COMPLETED;
      } else if (
        statusResponse.transaction_status === 'cancel' ||
        statusResponse.transaction_status === 'deny' ||
        statusResponse.transaction_status === 'expire'
      ) {
        // TODO set transaction status on your database to 'failure'
        payment.status = PaymentStatus.FAILED;
      } else if (statusResponse.transaction_status === 'pending') {
        // TODO set transaction status on your database to 'pending' / waiting payment
        payment.status = PaymentStatus.PENDING;
      }
      const response = await this.paymentService.save(payment);
      console.log(response);

      return HttpStatus.OK;
    } catch (error) {
      throw new BadRequestException(
        `An error occurred while executing transaction status from Midtrans: ${error.message}`,
      );
    }
  }
}
