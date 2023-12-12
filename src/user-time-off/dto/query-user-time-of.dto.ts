import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterUserTimeOff {
  @ApiProperty({ description: 'Choose among ASC, DESC, asc, or desc', example: "ASC" })
  @IsOptional()
  orderBy?: any;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  searchText?: number;

  @ApiProperty({ example: 10, description: "Number of data on a page" })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({ example: 1, description: "Choose page" })
  @IsNumber()
  @IsOptional()
  page?: number;
}
