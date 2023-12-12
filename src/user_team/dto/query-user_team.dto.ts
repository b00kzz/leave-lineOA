import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterUserTeam {
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
