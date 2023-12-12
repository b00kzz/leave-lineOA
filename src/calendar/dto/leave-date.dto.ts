import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

export class LeaveDateDto {
    @ApiProperty({ example: "2023-12-03" })
    @IsDateString()
    @IsOptional()
    startDate?: string;

    @ApiProperty({ example: "2023-12-07" })
    @IsDateString()
    @IsOptional()
    endDate?: string;
}