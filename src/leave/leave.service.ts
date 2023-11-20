import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from 'src/entities/leave.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private readonly LeaveRepo: Repository<Leave>,
  ) {}

  async create(createLeaveDto: CreateLeaveDto): Promise<Leave> {
    return this.LeaveRepo.save(createLeaveDto);
  }

  async findAll(): Promise<Leave[]> {
    return this.LeaveRepo.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.LeaveRepo.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async update(id: number, updateLeaveDto: UpdateLeaveDto) {
    const user = await this.LeaveRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateLeaveDto);
      return await this.LeaveRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.LeaveRepo.findOne({ where: { id } });
    if (detail) {
      await this.LeaveRepo.remove(detail);
      return { message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }
}
