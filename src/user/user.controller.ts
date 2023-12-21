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

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserFilterDto } from './dto/query-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @UseGuards(JwtGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Patch()
  async findAll(@Body() request: UserFilterDto) {
    try {
      const filter = new UserFilterDto();
      filter.take = request.take || 0;
      filter.skip = request.skip || 0;
      filter.firstName = request.firstName ?? '';
      filter.lastName = request.lastName ?? '';
      filter.orderBy = request.orderBy || 'DESC';
      filter.searchText = request.searchText || '';
      const { data, error } = await this.userService.findAll(filter);
      if (error) {
        throw new Error(error.message);
      }
      const count = await this.userService.count(filter);
      return { data, total: count.total };
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(+id, body);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
