// src/services/user.service.ts
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userRepository.create(createUserDto);
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    // ถ้ามี email Username ซ้ำ, สามารถทำการจัดการข้อผิดพลาดได้ตามที่คุณต้องการ
    if (existingUser) {
      const msg = {
        statusCode: HttpStatus.CONFLICT,
        massage: 'Email นี้ถูกใช้แล้ว',
      };
      return msg;
    } else {
      await this.userRepository.save(user);
      const { password, ...result } = user;
      return result;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }
  async update(id: number, createUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, createUserDto);
      return await this.userRepository.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      await this.userRepository.remove(user);
      throw new NotFoundException({
        massage: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
      });
    } else {
      throw new NotFoundException({
        massage: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async findByEmail(email: string): Promise<User> {
    console.log(email);
    return await this.userRepository.findOneBy({ email });
  }
}
