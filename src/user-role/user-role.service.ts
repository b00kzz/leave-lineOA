import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from 'src/entities/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
  ) {}

  async create(createRole: CreateUserRoleDto): Promise<UserRole> {
    return this.userRoleRepo.save(createRole);
  }

  async findAll(): Promise<UserRole[]> {
    return this.userRoleRepo.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userRoleRepo.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const user = await this.userRoleRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateUserRoleDto);
      return await this.userRoleRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.userRoleRepo.findOne({ where: { id } });
    if (detail) {
      await this.userRoleRepo.remove(detail);
      return { message: `ลบ User_Role ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบ User_Role ID: ${id}`,
      });
    }
  }
}
