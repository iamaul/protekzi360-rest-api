import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '../../../common/enum';

export class MidtransChargeRequestDTO {
  @ApiProperty({
    enum: PaymentType,
    description: 'Set Bank Transfer payment method',
    example: 'bank_transfer',
  })
  @IsEnum(PaymentType)
  payment_type: PaymentType;

  @ApiProperty({
    description:
      'The details of the specific transaction such as order_id and gross_amount',
  })
  transaction_details: TransactionDetailsBodyRequest;

  @ApiProperty({
    description: 'Charge details using bank transfer',
    required: false,
  })
  bank_transfer?: BankTransferBodyRequest;

  @ApiProperty({
    description:
      'Set Custom Expiry feature enables you to set an expiry time for the payment of every transaction with transaction_status:pending',
    required: false,
  })
  custom_expiry?: CustomExpiryBodyRequest;

  @ApiProperty({
    description: 'Charge details using Mandiri Bill Payment',
    required: false,
  })
  echannel?: EchannelBodyRequest;
}

export class TransactionDetailsBodyRequest {
  @ApiProperty({
    description:
      'Order Id of the transaction. Note: Allowed Symbols are dash(-), underscore(_), tilde (~), and dot (.)',
    example: 'A87551',
  })
  order_id: string;

  @ApiProperty({
    description: 'Total transaction amount in IDR. Note: Do not add decimal.',
    example: '145000',
  })
  gross_amount: number;
}

export class BankTransferBodyRequest {
  @ApiProperty({
    description: 'Bank name which processes bank transfer transaction',
    example: 'BCA',
  })
  bank: string;
}

export class CustomExpiryBodyRequest {
  @ApiProperty({
    description:
      'Timestamp at which the order is created on your website, in ISO 8601 format. Time Zone: GMT+7.',
    example: '2016-12-07 11:54:12 +0700',
  })
  order_time: string;

  @ApiProperty({
    description: 'Time duration for which the payment remains valid.',
    example: '60',
  })
  expiry_duration: number;

  @ApiProperty({
    description: 'Possible values are second, minute, hour, or day.',
    example: 'minute',
  })
  unit: string;
}

export class EchannelBodyRequest {
  @ApiProperty({
    description:
      'Label 1. Mandiri allows only 10 characters. Exceeding characters will be truncated',
    example: 'Payment For:',
  })
  bill_info1: string;

  @ApiProperty({
    description:
      'Value for Label 1. Mandiri allows only 30 characters. Exceeding characters will be truncated',
    example: 'Tuition fee',
  })
  bill_info2: string;
}
