import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkFlowCardDto } from './create-work-flow-card.dto';
import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateWorkFlowCardDto extends PartialType(CreateWorkFlowCardDto) {
    @IsEmpty()
    leaveId: number

    @IsString()
    work_flow_type: string

    @IsString()
    work_flow_code: string

    @IsNumber()
    userId: number
}
