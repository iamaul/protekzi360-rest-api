import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateScanDTO {
  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'The date of the scan started',
    example: '2022-07-03T12:08:56-07:00',
  })
  startDate: Date;
}

export class ScanDTO {
  @ApiPropertyOptional({
    description: 'The date of the scan finished',
    example: '2022-07-03T12:08:56-07:00',
  })
  finishedDate?: string;

  @ApiPropertyOptional({
    description: 'The total number of apps scanned',
    example: '200',
  })
  totalApp?: number;

  @ApiPropertyOptional({
    description: 'The total number of files scanned',
    example: '300',
  })
  totalFile?: number;

  @ApiPropertyOptional({
    description: 'The result of the scan',
    example: 'Your phone is safe',
  })
  scanResult?: string;

  @ApiPropertyOptional({
    description: 'The brand of the user’s device',
    example: 'Samsung',
    maxLength: 32,
  })
  phoneBrand?: string;

  @ApiPropertyOptional({
    description: 'The model of the user’s device',
    example: 'Samsung A5',
    maxLength: 64,
  })
  phoneModel?: string;

  @ApiProperty({
    description: 'The Android version of the user’s device',
    example: 'Android Lollipop 3.2',
    maxLength: 100,
  })
  androidVersion?: string;

  @ApiPropertyOptional({
    description: 'The SDK version of the user’s device',
    example: 'Android SDK v3.2',
    maxLength: 100,
  })
  sdkVersion?: string;

  @ApiPropertyOptional({
    description: 'If scan is read',
    example: true,
  })
  read?: boolean;

  @ApiPropertyOptional({
    description: 'Check if scan is finished',
    example: true,
  })
  finished?: boolean;
}
