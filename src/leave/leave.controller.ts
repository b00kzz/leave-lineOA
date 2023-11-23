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
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('leave')
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.create(createLeaveDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.leaveService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
    return this.leaveService.update(+id, updateLeaveDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveService.remove(+id);
  }
}
