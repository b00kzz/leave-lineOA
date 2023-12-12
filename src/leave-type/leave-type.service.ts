import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { LeaveType } from 'src/entities/leave-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { FilterLeaveTypeDto } from './dto/query-leave-type.dto';
import { error } from 'console';

@Injectable()
export class LeaveTypeService {
  constructor(
    @InjectRepository(LeaveType)
    private readonly LeaveTypeRepo: Repository<LeaveType>,
  ) { }

  async create(createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType> {
    return this.LeaveTypeRepo.save(createLeaveTypeDto);
  }

  async findAll(filter: FilterLeaveTypeDto): Promise<{ data: LeaveType[], error?: Error }> {
    try {
      const result = await this.LeaveTypeRepo.find({
        where: filter.searchText ? filter.SearchText() : filter.Filterlist(),
        skip: filter.skip,
        take: filter.take,
        order: { id: filter.orderBy }
      })
      if (!result) {
        return { data: [] as LeaveType[], error: new Error('data not found') }
      }
      return { data: result };
    } catch (errors) {
      return { data: [], error: errors }
    }
  }

  async count(filter: FilterLeaveTypeDto): Promise<{
    total: number,
    error?: Error
  }> {
    try {
      const result = await this.LeaveTypeRepo.count({
        where: filter.searchText ? filter.SearchText() : filter.Filterlist()
      })
      return { total: result }
    } catch (error) {
      return { total: 0, error: error }
    }
  }

  async findOne(id: number): Promise<any> {
    const user = await this.LeaveTypeRepo.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async update(id: number, updateLeaveTypeDto: UpdateLeaveTypeDto) {
    const user = await this.LeaveTypeRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateLeaveTypeDto);
      return await this.LeaveTypeRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.LeaveTypeRepo.findOne({ where: { id } });
    if (detail) {
      await this.LeaveTypeRepo.update(id, { deletedAt: new Date() });
      return { message: `ลบข้อมูล ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }
}
