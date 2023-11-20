import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLeaveDto {
  @IsNotEmpty()
  leaveStatus: string;

  @IsNotEmpty()
  leaveDesc: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  totalDate: number;

  @IsNotEmpty()
  leaveImage: string;

  @IsOptional()
  @IsString()
  updatedBy?: string;
}
