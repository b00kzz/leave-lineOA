import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Repository } from 'typeorm';
import { Position } from 'src/entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterPosition } from './dto/query-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) { }

  async create(create: CreatePositionDto): Promise<Position> {
    return this.positionRepository.save(create);
  }

  async findAll(query: FilterPosition): Promise<any> {
    const { page, limit, searchText, orderBy } = query;
    const offset = (page - 1) * limit;
    const order = { position_id: orderBy ? orderBy : 'DESC' }
    const queryBuilder = this.positionRepository.createQueryBuilder('position');
    if (searchText) {
      queryBuilder.where('position.name like :searchText', { searchText: `%${searchText}%` })
        .orWhere('position.nameLocal like :searchText', { searchText: `%${searchText}%` })
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
    const position = await this.positionRepository.findOne({ where: { id } });
    if (position) {
      return position;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const position = await this.positionRepository.findOne({ where: { id } });
    if (position) {
      const update = Object.assign(position, updatePositionDto);
      return await this.positionRepository.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const user = await this.positionRepository.findOne({ where: { id } });
    if (user) {
      // ทำการอัพเดตคอลัมน์ deletedAt ของ user
      await this.positionRepository.update(id, { deletedAt: new Date() });
      throw new NotFoundException({
        message: `ลบข้อมูล ID: ${id} สำเร็จ`,
      });
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }
}
