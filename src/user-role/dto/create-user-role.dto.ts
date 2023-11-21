import { IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  roleId: number;
}