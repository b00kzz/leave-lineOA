import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: '' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  nameLocal: string;
}
