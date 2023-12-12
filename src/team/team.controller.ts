import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamFilter } from './dto/query-team.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) { }
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @UseGuards(JwtGuard)
  @Patch()
  async findAll(@Body() request: TeamFilter) {
    try {
      const filter = new TeamFilter();
      filter.take = request.take || 0;
      filter.skip = request.skip || 0;
      filter.name = request.name ?? '';
      filter.orderBy = request.orderBy || 'DESC';
      filter.searchText = request.searchText || '';
      const { data, error } = await this.teamService.findAll(filter);
      if (error) {
        throw new Error(error.message);
      }
      const count = await this.teamService.count(filter);
      return { data, total: count.total };
    } catch (error) {
      return error;
    }
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }

  @UseGuards(JwtGuard)
  @Get('main/:id')
  findAllMain(@Param('id') id: string) {
    return this.teamService.findAllById(+id);
  }
}
