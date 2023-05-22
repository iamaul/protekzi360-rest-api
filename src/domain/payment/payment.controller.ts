import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
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
import { PaymentMethodDTO } from './dto/payment-method.dto';
import { PaymentMethodEntity } from '../../typeorm';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateUserPaymentBodyRequest } from '../user/dto/user-payment.dto';
import { UserPaymentDTO } from '../user/dto/user-payment.dto';

const {
  modules: {
    PAYMENT: {
      tag: PAYMENT_TAG,
      endPoints: { GET_PAYMENT_METHOD, CREATE_PAYMENT },
    },
  },
} = OPEN_API_CONSTANT;

@ApiTags(PAYMENT_TAG)
@ApiBearerAuth()
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
  ): Promise<UserPaymentDTO> {
    return this.paymentService.createPayment(payment, request);
  }
}
