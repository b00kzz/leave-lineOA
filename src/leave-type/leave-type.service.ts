import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { LeaveType } from 'src/entities/leave-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';

@Injectable()
export class LeaveTypeService {
  constructor(
    @InjectRepository(LeaveType)
    private readonly LeaveTypeRepo: Repository<LeaveType>,
  ) {}

  async create(userDetail: CreateLeaveTypeDto): Promise<LeaveType> {
    return this.LeaveTypeRepo.save(userDetail);
  }

  async findAll(): Promise<LeaveType[]> {
    return this.LeaveTypeRepo.find();
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
      await this.LeaveTypeRepo.remove(detail);
      return { message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }
}
