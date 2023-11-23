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
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-role')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(+id);
  }
}
