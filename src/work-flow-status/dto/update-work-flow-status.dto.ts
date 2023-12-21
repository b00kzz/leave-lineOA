import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkFlowStatusDto } from './create-work-flow-status.dto';

export class UpdateWorkFlowStatusDto extends PartialType(CreateWorkFlowStatusDto) {}
