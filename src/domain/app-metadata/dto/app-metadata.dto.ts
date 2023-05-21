import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AppMetadataDTO {
  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The total number of files scanned',
    example: '1000',
  })
  totalScan: number;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The total number of files cleaned',
    example: '2000',
  })
  totalVirus: number;
}
