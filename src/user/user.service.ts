// src/services/user.service.ts
import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userRepository.create(createUserDto);
    const existingUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    // ถ้ามี email Username ซ้ำ, สามารถทำการจัดการข้อผิดพลาดได้ตามที่คุณต้องการ
    // const { deletedAt, ...newUser } = user;
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
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      try {
        const update = Object.assign(user, updateUserDto);
        return await this.userRepository.save(update);
      } catch (error) {
        throw new NotFoundException({ massage: `อีเมล์นี้มีผู้ใช้งานแล้ว` });
      }
    } else {
      throw new NotFoundException({ massage: `User does not exit!!` });
    }
  }

  async removeUser(id: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      // ทำการอัพเดตคอลัมน์ deletedAt ของ user
      await this.userRepository.update(id, { deletedAt: new Date() });
      throw new NotFoundException({
        message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ`,
      });
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepository.findOne({ where: { username: userName } });
  }

  async findByEmail(username: string): Promise<User> {
    console.log(username);
    return await this.userRepository.findOneBy({ username });
  }
}
