import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from 'src/entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
  ) {}

  async create(createTeam: CreateTeamDto): Promise<Team> {
    return this.teamRepo.save(createTeam);
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepo.find();
  }

  async findOne(id: number): Promise<any> {
    const user = await this.teamRepo.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    const user = await this.teamRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateTeamDto);
      return await this.teamRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.teamRepo.findOne({ where: { id } });
    if (detail) {
      await this.teamRepo.update(id, { deletedAt: new Date() });
      return { message: `ลบ Team ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบ Team ID: ${id}`,
      });
    }
  }
}
