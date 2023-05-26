import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PaymentStatus } from '../../../common/enum';

export class CreateUserPaymentBodyRequest {
  @ApiProperty({
    description: 'The payment method id',
    example: '1',
  })
  paymentMethodId: number;

  @ApiProperty({
    description: 'The amount of the payment transaction',
    example: '300000',
  })
  amount: number;
}

export class UserPaymentDTO {
  @ApiPropertyOptional({
    description: 'The id of the user',
    example: '273162812',
  })
  userId?: string;

  @ApiProperty({
    description: 'The name of the va',
    example: '273162812',
  })
  va_name: string;

  @ApiProperty({
    description: 'The code of the va',
    example: '273162812',
  })
  va_code: string;

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

  @ApiProperty({
    description: 'The expired date of the payment',
    example: '2022-07-03T12:08:56-07:00',
  })
  expiredAt: Date;

  @ApiPropertyOptional({
    description: 'The updated date of the payment',
    example: '2022-07-03T12:08:56-07:00',
  })
  updatedAt?: Date;
}
