import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from 'src/entities/problem.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private readonly ProblemRepo: Repository<Problem>,
  ) {}

  async create(userDetail: CreateProblemDto): Promise<Problem> {
    return this.ProblemRepo.save(userDetail);
  }

  async findAll(): Promise<Problem[]> {
    return this.ProblemRepo.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.ProblemRepo.findOne({ where: { id } });
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
    const user = await this.ProblemRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateProblemDto);
      return await this.ProblemRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.ProblemRepo.findOne({ where: { id } });
    if (detail) {
      await this.ProblemRepo.remove(detail);
      return { message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }
}
