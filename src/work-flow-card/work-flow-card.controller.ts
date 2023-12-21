import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkFlowCardService } from './work-flow-card.service';
import { CreateWorkFlowCardDto } from './dto/create-work-flow-card.dto';
import { UpdateWorkFlowCardDto } from './dto/update-work-flow-card.dto';
import { FilterWorkFlowCard } from './dto/query-wf-card';

@Controller('work-flow-card')
export class WorkFlowCardController {
  constructor(private readonly workFlowCardService: WorkFlowCardService) { }

  @Post()
  create(@Body() createWorkFlowCardDto: CreateWorkFlowCardDto) {
    return this.workFlowCardService.create(createWorkFlowCardDto);
  }

  @Patch()
  async findAll(@Body() filter: FilterWorkFlowCard) {
    try {
      const result = await this.workFlowCardService.findAll(filter);
      return { success: true, total: result.total, data: result.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workFlowCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkFlowCardDto: UpdateWorkFlowCardDto) {
    return this.workFlowCardService.update(+id, updateWorkFlowCardDto);
  }
}
