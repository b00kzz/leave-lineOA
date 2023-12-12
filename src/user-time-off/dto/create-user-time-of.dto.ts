import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserTimeOffDto {
    @ApiProperty({ type: "number", example: 1 })
    @IsNumber()
    userId: number;

    @ApiProperty({ type: "number", example: 1 })
    @IsNumber()
    leaveTypeId: number;

    @ApiProperty({ type: "decimal" })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ type: "string", example: "2023-01-20  00:00" })
    @IsDateString()
    startTime: Date;

    @ApiProperty({ type: "string", example: "2023-01-20  00:00" })
    @IsDateString()
    endTime: Date;


}
