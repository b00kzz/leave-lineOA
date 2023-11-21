import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @IsOptional()
  @IsNumber()
  mainTeamId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nameLocal: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  status: string; //inactive || active
}
