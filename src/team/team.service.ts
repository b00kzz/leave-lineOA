import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from 'src/entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TypeORMError } from 'typeorm';
import { TeamFilter } from './dto/query-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepo: Repository<Team>,
  ) { }

  async create(createTeam: CreateTeamDto): Promise<Team> {
    return this.teamRepo.save(createTeam);
  }

  async findAll(filter: TeamFilter): Promise<{ data: Team[]; error?: Error }> {
    try {
      const data = await this.teamRepo.find({
        where: filter.searchText ? filter.SearchText() : filter.FilterList(),
        skip: filter.skip,
        take: filter.take,
        order: { id: filter.orderBy },
      });

      if (!data) {
        return { data: [] as Team[], error: new Error('Data not found') };
      }
      return { data: data };
    } catch (e) {
      const exception = e as TypeORMError;
      return { data: [] as Team[], error: new Error(exception.message) };
    }
  }

  async count(filter: TeamFilter): Promise<{
    total: number;
    error?: Error;
  }> {
    try {
      const result = await this.teamRepo.count({
        where: filter.searchText ? filter.SearchText() : filter.FilterList(),
      });

      return { total: result };
    } catch (e) {
      return { total: 0, error: e };
    }
  }

  async findOne(id: number): Promise<any> {
    const team = await this.teamRepo.findOne({ where: { id } });
    if (team) {
      return team;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูลผู้ใช้ ID: ${id}`,
      });
    }
  }

  async findAllById(id: number): Promise<any> {
    const teammain = await this.teamRepo.findOne({ where: { id } });
    const team = await this.teamRepo.find({ where: { mainTeamId: id } });
    if (teammain && team.length !== 0) {
      return {
        team: teammain,
        subTeam: team,
      };
    } else if (teammain && team.length === 0) {
      return {
        Team: teammain,
        message: `ไม่พบทีมย่อยของทีม ${teammain.name}`,
      };
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
