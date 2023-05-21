import { ApiProperty } from '@nestjs/swagger';

export class VaNumbers {
  @ApiProperty({
    description: 'The bank associated with the virtual account number',
    example: 'BCA',
  })
  bank: string;

  @ApiProperty({
    description: 'The virtual account number',
    example: '9101900001',
  })
  va_number: string;
}

export class MidtransApiResponseDTO {
  @ApiProperty({
    description: 'The status code of the response',
    example: '201',
  })
  status_code: string;

  @ApiProperty({
    description: 'The status message of the response',
    example: 'Success, Bank Transfer transaction is created',
  })
  status_message: string;

  @ApiProperty({
    description: 'The transaction ID',
    example: 'be03df7d-2f97-4c8c-a53c-8959f1b67295',
  })
  transaction_id: string;

  @ApiProperty({ description: 'The order ID', example: '1571823229' })
  order_id: string;

  @ApiProperty({ description: 'The merchant ID', example: 'G812785002' })
  merchant_id: string;

  @ApiProperty({ description: 'The gross amount', example: '44000.00' })
  gross_amount: string;

  @ApiProperty({ description: 'The currency', example: 'IDR' })
  currency: string;

  @ApiProperty({ description: 'The payment type', example: 'bank_transfer' })
  payment_type: string;

  @ApiProperty({
    description: 'The transaction time',
    example: '2019-10-23 16:33:49',
  })
  transaction_time: string;

  @ApiProperty({ description: 'The transaction status', example: 'pending' })
  transaction_status: string;

  @ApiProperty({
    type: [VaNumbers],
    description: 'The virtual account numbers',
  })
  va_numbers: VaNumbers[];

  @ApiProperty({ description: 'The fraud status', example: 'accept' })
  fraud_status: string;
}
