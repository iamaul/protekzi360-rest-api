import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ThreatDTO {
  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The package id of the app',
    example: 'com.whatsapp',
  })
  packageId: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The category of the app',
    example: 'communication',
  })
  category: number;
}
