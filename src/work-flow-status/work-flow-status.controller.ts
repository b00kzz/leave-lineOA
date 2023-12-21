import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkFlowStatusService } from './work-flow-status.service';
import { CreateWorkFlowStatusDto } from './dto/create-work-flow-status.dto';
import { UpdateWorkFlowStatusDto } from './dto/update-work-flow-status.dto';

@Controller('work-flow-status')
export class WorkFlowStatusController {
  constructor(private readonly workFlowStatusService: WorkFlowStatusService) { }

  @Post()
  create(@Body() createWorkFlowStatusDto: CreateWorkFlowStatusDto) {
    return this.workFlowStatusService.create(createWorkFlowStatusDto);
  }

  @Get()
  findAll() {
    return this.workFlowStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workFlowStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkFlowStatusDto: UpdateWorkFlowStatusDto) {
    return this.workFlowStatusService.update(+id, updateWorkFlowStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workFlowStatusService.remove(+id);
  }
}
