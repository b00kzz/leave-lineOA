import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserLeaveQuantityDto } from './dto/create-user-leave-quantity.dto';
import { UpdateUserLeaveQuantityDto } from './dto/update-user-leave-quantity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLeaveQuantity } from 'src/entities/user-leave-quantity.entity';
import { Repository } from 'typeorm';
import { FilterUserLeaveQuantity } from './dto/query-leave-quantity';

@Injectable()
export class UserLeaveQuantityService {
  constructor(
    @InjectRepository(UserLeaveQuantity)
    private readonly userLeaveQuantityRepository: Repository<UserLeaveQuantity>,
  ) { }
  async create(create: CreateUserLeaveQuantityDto): Promise<UserLeaveQuantity> {
    return this.userLeaveQuantityRepository.save(create);
  }

  async findAll(query: FilterUserLeaveQuantity): Promise<any> {
    const { page, limit, searchText, orderBy } = query;
    const offset = (page - 1) * limit;
    const order = { id: orderBy ? orderBy : 'DESC' }
    const queryBuilder = this.userLeaveQuantityRepository.createQueryBuilder('user_leave_quantity');
    if (searchText) {
      queryBuilder.where('user_leave_quantity.user_id = :searchText', { searchText: searchText })
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
    const user = await this.userLeaveQuantityRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async update(id: number, updateUserTimeOffDto: UpdateUserLeaveQuantityDto) {
    const userTimeOff = await this.userLeaveQuantityRepository.findOne({ where: { id } });
    if (userTimeOff) {
      const update = Object.assign(userTimeOff, updateUserTimeOffDto);
      return await this.userLeaveQuantityRepository.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.userLeaveQuantityRepository.findOne({ where: { id } });
    if (detail) {
      await this.userLeaveQuantityRepository.update(id, { deletedAt: new Date() });
      return { message: `ลบ userTimeOf ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบ userTimeOf ID: ${id}`,
      });
    }
  }
}
