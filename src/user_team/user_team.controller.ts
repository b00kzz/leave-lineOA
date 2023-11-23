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

@ApiTags('user-team')
@Controller('user-team')
export class UserTeamController {
  constructor(private readonly userTeamService: UserTeamService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createUserTeamDto: CreateUserTeamDto) {
    return this.userTeamService.create(createUserTeamDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.userTeamService.findAll();
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
