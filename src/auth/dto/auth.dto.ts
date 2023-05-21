import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsAlpha,
} from 'class-validator';
import { Roles } from '../../common/enum';

export class AuthDTO {
  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'Email of the user',
    example: 'johndoe@email.com',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'Password of the user',
    example: '************',
  })
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message: 'The password is too weak',
  })
  password: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  firstName: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  lastName: string;

  @IsNotEmpty({ message: 'Invalid Mandatory Field $property' })
  @ApiProperty({
    description: 'Role of the user',
    example: 'admin',
  })
  @IsEnum(Roles)
  role: Roles;
}
