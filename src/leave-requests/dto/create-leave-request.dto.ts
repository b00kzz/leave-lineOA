import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLeaveRequestDto {
    @ApiProperty({ type: "number", example: 1 })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ type: "number", example: 1 })
    @IsNotEmpty()
    @IsNumber()
    leaveTypeId: number;

    //generate number queue
    @ApiProperty({ type: "string", example: "LEAVE-202301" })
    @IsNotEmpty()
    @IsOptional()
    code?: string;

    @ApiProperty({ type: "string", example: "2023-01-20" })
    @IsDateString()
    startTime: Date;

    @ApiProperty({ type: "string", example: "morning" || "afternoon" || "full day" })
    @IsNotEmpty()
    @IsString()
    startLeaveDayType: string;

    @ApiProperty({ type: "string", example: "2023-01-21" })
    @IsDateString()
    endTime?: Date;

    @ApiProperty({ type: "string", example: "morning" || "afternoon" || "full day" })
    @IsNotEmpty()
    @IsString()
    endLeaveDayType?: string;

    @ApiProperty({ type: "number", example: 1 })
    @IsNotEmpty()
    @IsNumber()
    leaveDuration: number;

    @ApiProperty({ type: "string", example: "I am sick" })
    @IsNotEmpty()
    @IsString()
    leaveReason: string;

    @ApiProperty({ type: "string", example: "I am sick" })
    @IsNotEmpty()
    @IsString()
    remark: string;

    // @ApiProperty({ type: "string", example: "pending approval" || "approved" || "rejected" || "cancelled" })
    @IsOptional()
    @IsString()
    status?: string
}
