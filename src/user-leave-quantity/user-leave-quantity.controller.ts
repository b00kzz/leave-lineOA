import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserLeaveQuantityService } from './user-leave-quantity.service';
import { CreateUserLeaveQuantityDto } from './dto/create-user-leave-quantity.dto';
import { UpdateUserLeaveQuantityDto } from './dto/update-user-leave-quantity.dto';
import { FilterUserLeaveQuantity } from './dto/query-leave-quantity';

@Controller('user-leave-quantity')
export class UserLeaveQuantityController {
  constructor(private readonly userLeaveQuantityService: UserLeaveQuantityService) { }

  @Post()
  create(@Body() createUserLeaveQuantityDto: CreateUserLeaveQuantityDto) {
    return this.userLeaveQuantityService.create(createUserLeaveQuantityDto);
  }

  @Patch()
  async findAll(@Body() filter: FilterUserLeaveQuantity): Promise<any> {
    try {
      const result = await this.userLeaveQuantityService.findAll(filter);
      return { success: true, data: result.data, total: result.total };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLeaveQuantityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLeaveQuantityDto: UpdateUserLeaveQuantityDto) {
    return this.userLeaveQuantityService.update(+id, updateUserLeaveQuantityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLeaveQuantityService.remove(+id);
  }
}
