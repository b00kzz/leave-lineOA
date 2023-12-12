import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserTeam } from "src/entities/user_team.entity";
import { Repository } from "typeorm";
import { CreateUserTeamDto } from "./dto/create-user_team.dto";
import { FilterUserTeam } from "./dto/query-user_team.dto";
import { UpdateUserTeamDto } from "./dto/update-user_team.dto";

@Injectable()
export class UserTeamService {
  constructor(
    @InjectRepository(UserTeam)
    private readonly userTeamRepo: Repository<UserTeam>,
  ) { }

  async create(createRole: CreateUserTeamDto): Promise<UserTeam> {
    return this.userTeamRepo.save(createRole);
  }

  async findAll(query: FilterUserTeam): Promise<any> {
    if (!query || !query.page || !query.limit || !query.orderBy) {
      throw new BadRequestException('Invalid query parameters');
    }
    const { page, limit, orderBy, searchText } = query;
    const offset = (page - 1) * limit;
    const order = { id: orderBy ? orderBy : 'DESC' }
    const queryBuilder = this.userTeamRepo.createQueryBuilder('user_team');
    if (searchText) {
      queryBuilder.where('user_team.userId = :searchText', { searchText: searchText })
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
    const user = await this.userTeamRepo.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }

  async update(id: number, updateUserTeamDto: UpdateUserTeamDto) {
    const user = await this.userTeamRepo.findOne({ where: { id } });
    if (user) {
      const update = Object.assign(user, updateUserTeamDto);
      return await this.userTeamRepo.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const detail = await this.userTeamRepo.findOne({ where: { id } });
    if (detail) {
      await this.userTeamRepo.remove(detail);
      return { message: `ลบ User_Team ID: ${id} สำเร็จ` };
    } else {
      throw new NotFoundException({
        message: `ไม่พบ User_Team ID: ${id}`,
      });
    }
  }
}
