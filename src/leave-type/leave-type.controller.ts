import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LeaveTypeService } from './leave-type.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { FilterLeaveTypeDto } from './dto/query-leave-type.dto';

@ApiTags('leave-type')
@Controller('leave-type')
export class LeaveTypeController {
  constructor(private readonly leaveTypeService: LeaveTypeService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createLeaveTypeDto: CreateLeaveTypeDto) {
    return this.leaveTypeService.create(createLeaveTypeDto);
  }

  @UseGuards(JwtGuard)
  @Patch()
  async findAll(@Body() req: FilterLeaveTypeDto) {
    try {
      const filter = new FilterLeaveTypeDto
      filter.take = req.take || 0;
      filter.skip = req.skip || 0;
      filter.orderBy = req.orderBy || "DESC";
      filter.searchText = req.searchText || '';
      filter.code = req.code ?? '';
      filter.name = req.name ?? '';
      filter.nameLocal = req.nameLocal ?? '';
      const { data, error } = await this.leaveTypeService.findAll(filter)
      if (error) {
        throw new Error(error.message)
      }
      const count = await this.leaveTypeService.count(filter)
      return { data, total: count.total }
    } catch (error) {
      return error
    }

  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveTypeService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeaveTypeDto: UpdateLeaveTypeDto,
  ) {
    return this.leaveTypeService.update(+id, updateLeaveTypeDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveTypeService.remove(+id);
  }
}
