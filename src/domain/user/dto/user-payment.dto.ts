import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PaymentStatus } from '../../../common/enum';
import { PaymentMethodEntity } from '../../../typeorm';

export class UserPaymentDTO {
  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The payment method id that the user has selected',
    example: '9b12830f-aaf5-4b63-9116-9641bc6a1b20',
  })
  paymentMethod: PaymentMethodEntity;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The code of the payment',
    example: '273162812',
  })
  code: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The amount of the payment',
    example: '200000.00',
  })
  amount: number;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
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

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The expired date of the payment',
    example: '2022-07-03T12:08:56-07:00',
  })
  expiredAt: Date;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The updated date of the payment',
    example: '2022-07-03T12:08:56-07:00',
  })
  updatedAt: Date;
}
