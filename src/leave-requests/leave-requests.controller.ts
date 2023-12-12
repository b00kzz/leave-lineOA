import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaveRequestsService } from './leave-requests.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { FilterLeaveReq } from './dto/query-leave-req.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Leave Requests')
@Controller('leave')
export class LeaveRequestsController {
  constructor(private readonly leaveRequestsService: LeaveRequestsService) { }

  @Post()
  create(@Body() createLeaveRequestDto: CreateLeaveRequestDto) {
    const newCust = { ...createLeaveRequestDto, status: 'pending approval' };
    return this.leaveRequestsService.create(newCust);
  }

  @Patch()
  async findAll(@Body() filter: FilterLeaveReq): Promise<any> {
    try {
      const result = await this.leaveRequestsService.findAll(filter);
      return { success: true, data: result.data, total: result.total };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get("user/:id")
  async findAllByUserId(@Param('id') id: string): Promise<any> {
    try {
      const result = await this.leaveRequestsService.findAllByUserId(+id);
      return { success: true, data: result.data, total: result.total };
    } catch (error) {
      error
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveRequestDto: UpdateLeaveRequestDto) {
    return this.leaveRequestsService.update(+id, updateLeaveRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveRequestsService.remove(+id);
  }
}
