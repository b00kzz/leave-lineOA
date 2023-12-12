import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from 'src/entities/problem.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterProblem } from './dto/query-problem.dto';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private readonly problemRepo: Repository<Problem>,
  ) { }

  async create(userDetail: CreateProblemDto): Promise<Problem> {
    return this.problemRepo.save(userDetail);
  }

  async findAll(query: FilterProblem): Promise<any> {
    const { page, limit, searchText, orderBy } = query;
    const offset = (page - 1) * limit;
    const order = { problem_id: orderBy ? orderBy : 'DESC' }
    const queryBuilder = this.problemRepo.createQueryBuilder('problem');
    if (searchText) {
      queryBuilder.where('problem.topic like :searchText', { searchText: `%${searchText}%` })
        .andWhere('problem.description like :searchText', { searchText: `%${searchText}%` })
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
    const user = await this.problemRepo.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async update(id: number, updateProblemDto: UpdateProblemDto) {
    const user = await this.problemRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateProblemDto);
      return await this.problemRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.problemRepo.findOne({ where: { id } });
    if (detail) {
      await this.problemRepo.remove(detail);
      return { message: `ลบข้อมูล ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }
}
