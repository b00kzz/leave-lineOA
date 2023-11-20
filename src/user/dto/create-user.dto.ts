import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  // @Matches(/^(?=.*[a-z])(?=.*[A-Z\d!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/, {
  //   message:
  //     'ต้องมีตัวอักษร a-z หรือ A-Z อย่างน้อย 1 ตัว ต้องมีตัวอักษรพิเศษอย่างน้อย 1 ตัว และต้องมีอย่างน้อย 8 ตัวอักษร',
  // })
  @IsNotEmpty()
  password: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
