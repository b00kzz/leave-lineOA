import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nameLocal: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  colour: string;
}
