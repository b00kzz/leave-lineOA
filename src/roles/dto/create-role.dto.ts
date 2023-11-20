import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  roleName: string;

  @IsNotEmpty()
  roleDesc: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
