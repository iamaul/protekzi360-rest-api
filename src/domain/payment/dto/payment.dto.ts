import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaymentMethodDTO {
  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The payment name',
    example: 'BNI',
  })
  paymentName: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The payment type',
    example: 'VA',
  })
  paymentType: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The payment logo',
    example: 'bni.com',
  })
  paymentLogo: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The payment detail',
    example: 'BNI Virtual Account',
  })
  paymentDetail: string;
}

export class CreatePaymentResponse {
  id: string;
  paymentMethod: {
    name: string;
    logo: string;
  };
  va_name: string;
  va_code: string;
  amount: number;
  status: string;
  expiredAt: Date;
}
