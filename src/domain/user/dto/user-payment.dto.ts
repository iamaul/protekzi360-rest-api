import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PaymentStatus } from '../../../common/enum';

export class CreateUserPaymentBodyRequest {
  @ApiProperty({
    description: 'The payment method id',
    example: 'dddd7b8d-accf-4b20-813f-5b307e60f776',
  })
  paymentMethodId: string;

  @ApiProperty({
    description: 'The amount of the payment transaction',
    example: '300000',
  })
  amount: number;
}

export class UserPaymentDTO {
  @ApiProperty({
    description: 'The code of the payment',
    example: '273162812',
  })
  code: string;

  @ApiProperty({
    description: 'The amount of the payment',
    example: '200000.00',
  })
  amount: number;

  @ApiProperty({
    description: 'The status of the payment',
    example: 'pending',
    enum: PaymentStatus,
  })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiPropertyOptional({
    description: 'The meta of the payment json response',
    example: 'object[] response',
  })
  meta?: any;

  @ApiProperty({
    description: 'The expired date of the payment',
    example: '2022-07-03T12:08:56-07:00',
  })
  expiredAt: Date;

  @ApiProperty({
    description: 'The updated date of the payment',
    example: '2022-07-03T12:08:56-07:00',
  })
  updatedAt: Date;
}
