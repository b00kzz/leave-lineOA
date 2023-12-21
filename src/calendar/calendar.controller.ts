import { Body, Controller, Get, Patch } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { LeaveDateDto } from './dto/leave-date.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Calendar')
@Controller('calendar')
export class CalendarController {
    constructor(private readonly CalendarService: CalendarService) { }

    // @Patch()
    // async getHolidays(@Body() leaveDate: LeaveDateDto): Promise<any> {
    //     const holidays = await this.CalendarService.getHolidays(leaveDate);
    //     const leaveDays = await this.CalendarService.differentDay(leaveDate);
    //     if (holidays.length !== 0 && leaveDate.endDate) {
    //         const total = leaveDays - holidays.length;
    //         return { leaveDays: total, holidays };
    //     }
    //     return { leaveDays: leaveDays, holidays };
    // }

    @Get()
    async findAll(): Promise<any> {
        const holidays = await this.CalendarService.findAll();
        return holidays;
    }
}
