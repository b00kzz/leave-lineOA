import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { FilterHoliday } from './dto/query-holiday.dto';
import { ApiTags } from '@nestjs/swagger';
import { LeaveDateDto } from 'src/calendar/dto/leave-date.dto';
import { CalendarService } from 'src/calendar/calendar.service';

@ApiTags('holiday')
@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService, private readonly CalendarService: CalendarService) { }

  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto) {
    return this.holidayService.create(createHolidayDto);
  }

  @Post('many')
  createMany() {
    const holiday = this.holidayService.createManyHolidays();
    return holiday
  }

  @Patch()
  async findAll(@Body() filter: FilterHoliday): Promise<any> {
    try {
      const result = await this.holidayService.findAll(filter);
      return { success: true, data: result.data, total: result.total };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    return this.holidayService.update(+id, updateHolidayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidayService.remove(+id);
  }
}
