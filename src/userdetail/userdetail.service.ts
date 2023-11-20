import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdetail } from 'src/entities/userdetail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserdetailService {
  constructor(
    @InjectRepository(Userdetail)
    private readonly userDetailRepo: Repository<Userdetail>,
  ) {}

  async create(userDetail: CreateUserdetailDto): Promise<Userdetail> {
    return this.userDetailRepo.save(userDetail);
  }

  async findAll(): Promise<Userdetail[]> {
    return this.userDetailRepo.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userDetailRepo.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async update(id: number, updateUserdetailDto: UpdateUserdetailDto) {
    const user = await this.userDetailRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateUserdetailDto);
      return await this.userDetailRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.userDetailRepo.findOne({ where: { id } });
    if (detail) {
      await this.userDetailRepo.remove(detail);
      return { message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }
}
