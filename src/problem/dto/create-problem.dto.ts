import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProblemDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  topic: string;

  @IsNotEmpty()
  description: string;

}
