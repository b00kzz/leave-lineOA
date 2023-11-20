import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsNotEmpty()
  ltTopic: string;

  @IsNotEmpty()
  ltTime: string;

  @IsNotEmpty()
  ltTotal: number;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
