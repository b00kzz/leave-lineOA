import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProblemDto {
  @IsNotEmpty()
  topic: string;

  @IsNotEmpty()
  problem: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
