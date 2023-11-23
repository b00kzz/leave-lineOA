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

@ApiTags('leave-type')
@Controller('leave-type')
export class LeaveTypeController {
  constructor(private readonly leaveTypeService: LeaveTypeService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createLeaveTypeDto: CreateLeaveTypeDto) {
    return this.leaveTypeService.create(createLeaveTypeDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.leaveTypeService.findAll();
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
