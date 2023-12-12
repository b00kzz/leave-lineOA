import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserTimeOffDto } from './dto/create-user-time-of.dto';
import { UpdateUserTimeOffDto } from './dto/update-user-time-of.dto';
import { UserTimeOff } from 'src/entities/user-time-off.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterUserTimeOff } from './dto/query-user-time-of.dto';

@Injectable()
export class UserTimeOffService {
  constructor(
    @InjectRepository(UserTimeOff)
    private readonly userTimeOfRepository: Repository<UserTimeOff>,
  ) { }

  async create(create: CreateUserTimeOffDto): Promise<UserTimeOff> {
    return this.userTimeOfRepository.save(create);
  }

  async findAll(query: FilterUserTimeOff): Promise<any> {
    const { page, limit, searchText, orderBy } = query;
    const offset = (page - 1) * limit;
    const order = { id: orderBy ? orderBy : 'DESC' }
    const queryBuilder = this.userTimeOfRepository.createQueryBuilder('user_leave_quantity');
    if (searchText) {
      queryBuilder.where('user_leave_quantity.userId = :searchText', { searchText: searchText })
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

  async findOne(id: number): Promise<any> {
    const userTimeOf = await this.userTimeOfRepository.findOne({ where: { userId: id } });
    if (userTimeOf) {
      return userTimeOf;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }

  async update(id: number, updateUserTimeOffDto: UpdateUserTimeOffDto) {
    const userTimeOff = await this.userTimeOfRepository.findOne({ where: { id } });
    if (userTimeOff) {
      const update = Object.assign(userTimeOff, updateUserTimeOffDto);
      return await this.userTimeOfRepository.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.userTimeOfRepository.findOne({ where: { id } });
    if (detail) {
      await this.userTimeOfRepository.update(id, { deletedAt: new Date() });
      return { message: `ลบ userTimeOf ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบ userTimeOf ID: ${id}`,
      });
    }
  }
}
