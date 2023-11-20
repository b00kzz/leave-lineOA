import { IsOptional, IsString } from 'class-validator';

export class CreateUserdetailDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  userImage?: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
