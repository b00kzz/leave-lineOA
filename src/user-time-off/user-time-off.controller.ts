import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTimeOffService } from './user-time-off.service';
import { CreateUserTimeOffDto } from './dto/create-user-time-of.dto';
import { UpdateUserTimeOffDto } from './dto/update-user-time-of.dto';
import { FilterUserTimeOff } from './dto/query-user-time-of.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-time-off')
@Controller('user-time-off')
export class UserTimeOffController {
  constructor(private readonly userTimeOfService: UserTimeOffService) { }

  @Post()
  create(@Body() createUserTimeOfDto: CreateUserTimeOffDto) {
    return this.userTimeOfService.create(createUserTimeOfDto);
  }

  @Patch()
  async findAll(@Body() filter: FilterUserTimeOff): Promise<any> {
    try {
      const result = await this.userTimeOfService.findAll(filter);
      return { success: true, data: result.data, total: result.total };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTimeOfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTimeOfDto: UpdateUserTimeOffDto) {
    return this.userTimeOfService.update(+id, updateUserTimeOfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTimeOfService.remove(+id);
  }
}
