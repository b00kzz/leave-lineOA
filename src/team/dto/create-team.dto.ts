import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsNumber()
  mainTeamId: number;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '' })
  @IsNotEmpty()
  nameLocal: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'active' })
  @IsNotEmpty()
  status: string; //inactive || active
}
