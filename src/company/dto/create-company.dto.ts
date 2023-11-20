import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  comopName: string;

  @IsNotEmpty()
  bu: string;

  @IsNotEmpty()
  agency: string;

  @IsNotEmpty()
  positon: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
