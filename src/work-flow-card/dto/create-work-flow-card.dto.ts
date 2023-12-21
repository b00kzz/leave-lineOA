import { IsNumber, IsString } from "class-validator"

export class CreateWorkFlowCardDto {
    @IsNumber()
    leaveId: number

    @IsString()
    work_flow_type: string

    @IsString()
    work_flow_code: string

    @IsNumber()
    userId: number
}
