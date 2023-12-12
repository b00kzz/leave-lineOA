import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FilterRole } from './dto/query-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly RoleRepo: Repository<Role>,
  ) { }

  async create(createRole: CreateRoleDto): Promise<Role> {
    return this.RoleRepo.save(createRole);
  }

  async findAll(filter: FilterRole): Promise<{ data: Role[], total?: number, error?: Error }> {
    const result = await this.RoleRepo.find({
      where: filter.searchText ? filter.SearchText() : filter.FilterList(),
      skip: filter.skip,
      take: filter.take,
      order: { id: filter.orderBy },
    });
    const total = await this.RoleRepo.count({
      where: filter.searchText ? filter.SearchText() : filter.FilterList(),
    })
    if (result) {
      return { data: result, total: total };
    }
    return { data: [], error: new Error('ไม่พบข้อมูล') };
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
