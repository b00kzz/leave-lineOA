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
import { UserTeamService } from './user_team.service';
import { CreateUserTeamDto } from './dto/create-user_team.dto';
import { UpdateUserTeamDto } from './dto/update-user_team.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { FilterUserTeam } from './dto/query-user_team.dto';

@ApiTags('user-team')
@Controller('user-team')
export class UserTeamController {
  constructor(private readonly userTeamService: UserTeamService) { }
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createUserTeamDto: CreateUserTeamDto) {
    return this.userTeamService.create(createUserTeamDto);
  }

  @UseGuards(JwtGuard)
  @Patch()
  async findAll(@Body() filter: FilterUserTeam): Promise<any> {
    try {
      const result = await this.userTeamService.findAll(filter);
      return { success: true, data: result.data, total: result.total };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTeamService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserTeamDto: UpdateUserTeamDto,
  ) {
    return this.userTeamService.update(+id, updateUserTeamDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTeamService.remove(+id);
  }
}
