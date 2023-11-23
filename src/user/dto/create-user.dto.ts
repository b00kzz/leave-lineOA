import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '123@example.com' })
  @IsEmail()
  username: string;

  // @Matches(/^(?=.*[a-z])(?=.*[A-Z\d!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/, {
  //   message:
  //     'ต้องมีตัวอักษร a-z หรือ A-Z อย่างน้อย 1 ตัว ต้องมีตัวอักษรพิเศษอย่างน้อย 1 ตัว และต้องมีอย่างน้อย 8 ตัวอักษร',
  // })
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  password: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  middleName: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  firstNameLocal: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  middleNameLocal: string;

  @IsNotEmpty()
  @ApiProperty({ example: '' })
  lastNameLocal: string;

  // @IsOptional()
  // isActive?: boolean;
}
