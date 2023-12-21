import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday } from 'src/entities/holiday.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CalendarService } from 'src/calendar/calendar.service';
import { FilterDay, FilterHoliday } from './dto/query-holiday.dto';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
    private readonly calendarService: CalendarService,
  ) { }

  async create(create: CreateHolidayDto): Promise<Holiday> {
    return this.holidayRepository.save(create);
  }

  async findAll(query: FilterHoliday): Promise<any> {
    const { page, limit, searchText, orderBy } = query;
    const offset = (page - 1) * limit;
    const order = { holiday_id: orderBy ? orderBy : 'DESC' }
    const queryBuilder = this.holidayRepository.createQueryBuilder('holiday');
    if (searchText) {
      queryBuilder.where('holiday.name like :searchText', { searchText: `%${searchText}%` })
        .orWhere('holiday.nameLocal like :searchText', { searchText: `%${searchText}%` })
        .orWhere('holiday.description like :searchText', { searchText: `%${searchText}%` })
    }
    if (offset) {
      //เลขหน้า
      queryBuilder.skip(offset);
    }
    if (limit) {
      //จำนวนข้อมูลที่แสดง
      queryBuilder.take(limit);
    }
    queryBuilder.orderBy(order);
    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total };
  }

  async findByStartEnd(filterday: FilterDay) {
    if (filterday.startTime && filterday.endTime) {
      const startDate = new Date(filterday.startTime)
      const endDate = new Date(filterday.endTime)
      const holiday = this.holidayRepository
        .createQueryBuilder('holiday')
        .where('holiday.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      const [data, total] = await holiday.getManyAndCount();
      const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

      // ใช้วนลูปตั้งแต่ startDate ถึง endDate
      let saturdayCount = 0;
      let mondayCount = 0;
      for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        // ตรวจสอบว่าวันปัจจุบันเป็นวันเสาร์หรือไม่ (0 = วันอาทิตย์, 6 = วันเสาร์)
        if (currentDate.getDay() === 6) {
          saturdayCount++;
        }
        if (currentDate.getDay() === 0) {
          mondayCount++;
        }
      }
      let result = differenceInDays - (total + (saturdayCount + mondayCount))
      if (filterday.startLeaveDayType !== 'full day') {
        result -= 0.5
        if (filterday.endLeaveDayType === 'afternoon') {
          result += 0.5
        } else if (filterday.endLeaveDayType === 'full day') {
          result += 1
        }
      }
      if (filterday.startLeaveDayType === 'full day') {
        if (filterday.endLeaveDayType === "afternoon") {
          result += 0.5
        } else if (filterday.endLeaveDayType === "full day") {
          result += 1
        }
      }
      return { holidays: data, leaveQuantity: result }
    } else if (filterday.startTime) {
      if (filterday.startLeaveDayType !== 'full day') {
        const result = 0.5
        return { holidays: [], leaveQuantity: result }
      } else {
        const result = 1
        return { holidays: [], leaveQuantity: result }
      }
    }
  }

  async createManyHolidays(): Promise<any> {
    const holidays = await this.calendarService.findAll();
    const getHoliday = await this.holidayRepository.find({ where: { date: holidays.date }, order: { id: 'DESC' } })
    if (getHoliday.length > 0) {
      const lastHoliday = getHoliday[0].date;
      const nextHoliday = new Date(lastHoliday.setDate(lastHoliday.getDate() + 1));
      const getByDate = await this.calendarService.findByDate(nextHoliday)
      return this.holidayRepository.save(getByDate);
    } else {
      return this.holidayRepository.save(holidays);
    }
  }

  async findOne(id: number): Promise<any> {
    const holiday = await this.holidayRepository.findOne({ where: { id } });
    if (holiday) {
      return holiday;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }

  async update(id: number, updateHolidayDto: UpdateHolidayDto) {
    const holiday = await this.holidayRepository.findOne({ where: { id } });
    if (holiday) {
      const update = Object.assign(holiday, updateHolidayDto);
      return await this.holidayRepository.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const user = await this.holidayRepository.findOne({ where: { id } });
    if (user) {
      // ทำการอัพเดตคอลัมน์ deletedAt ของ user
      await this.holidayRepository.update(id, { deletedAt: new Date() });
      throw new NotFoundException({
        message: `ลบข้อมูล ID: ${id} สำเร็จ`,
      });
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }
}
