import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LeaveRequestsService } from './leave-requests.service';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { FilterLeaveReq } from './dto/query-leave-req.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Leave Requests')
@Controller('leave')
export class LeaveRequestsController {
  constructor(private readonly leaveRequestsService: LeaveRequestsService) { }
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createLeaveRequestDto: CreateLeaveRequestDto) {
    const newCust = { ...createLeaveRequestDto, status: 'Pending' };
    return this.leaveRequestsService.create(newCust);
  }

  @UseGuards(JwtGuard)
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
