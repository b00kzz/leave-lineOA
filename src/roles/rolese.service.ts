import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly RoleRepo: Repository<Role>,
  ) {}

  async create(createRole: CreateRoleDto): Promise<Role> {
    return this.RoleRepo.save(createRole);
  }

  async findAll(): Promise<Role[]> {
    return this.RoleRepo.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.RoleRepo.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const user = await this.RoleRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateRoleDto);
      return await this.RoleRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.RoleRepo.findOne({ where: { id } });
    if (detail) {
      await this.RoleRepo.update(id, { deletedAt: new Date() });
      return { message: `ลบ Role ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบ Role ID: ${id}`,
      });
    }
  }
}
