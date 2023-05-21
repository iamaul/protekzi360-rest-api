import { ApiProperty } from '@nestjs/swagger';

export class TransactionDetails {
  @ApiProperty({ description: 'The order ID', example: 'order-id' })
  order_id: string;

  @ApiProperty({ description: 'The gross amount', example: '44000' })
  gross_amount: number;
}

export class BankTransferDetail {
  @ApiProperty({ description: 'The bank', example: 'BCA' })
  bank: string;
}

export class MidtransApiRequestDTO {
  @ApiProperty({ description: 'The payment type', example: 'bank_transfer' })
  payment_type: string;

  @ApiProperty({
    type: TransactionDetails,
    description: 'The transaction details',
  })
  transaction_details: TransactionDetails;

  @ApiProperty({
    type: BankTransferDetail,
    description: 'The bank transfer details',
  })
  bank_transfer: BankTransferDetail;
}
