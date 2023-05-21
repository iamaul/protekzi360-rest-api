import { Controller, Get, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OPEN_API_CONSTANT } from '../../common/open-api.constant';
import { PaymentService } from './payment.service';
import { PaymentMethodDTO } from './dto/payment-method.dto';
import { PaymentMethodEntity } from '../../typeorm';

const {
  modules: {
    PAYMENT: {
      tag: PAYMENT_TAG,
      endPoints: { GET_PAYMENT_METHOD },
    },
  },
} = OPEN_API_CONSTANT;

@ApiTags(PAYMENT_TAG)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

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
  getPaymentMethodList(): Promise<PaymentMethodEntity[]> {
    return this.paymentService.getPaymentMethodList();
  }
}
