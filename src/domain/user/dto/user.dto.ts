import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'Email of the user',
    example: 'johndoe@email.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'The premium status of the user',
    example: false,
  })
  isPremium?: boolean;
}

export class UserMetadataDTO {
  @ApiPropertyOptional({
    description: 'The appsFlyerId of the user',
    example: '',
  })
  appsFlyerId?: string;

  @ApiPropertyOptional({
    description: 'The advertisingId of the user',
    example: '',
  })
  advertisingId?: string;

  @ApiPropertyOptional({
    description: 'The fcm token of the user (optional)',
    example: '',
  })
  fcmToken?: string;
}
