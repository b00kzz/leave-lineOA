import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from 'src/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyRepo.save(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepo.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.companyRepo.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const user = await this.companyRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateCompanyDto);
      return await this.companyRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.companyRepo.findOne({ where: { id } });
    if (detail) {
      await this.companyRepo.remove(detail);
      return { message: `ลบข้อมูลผู้ใช้ ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }
}
