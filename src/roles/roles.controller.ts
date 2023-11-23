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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './rolese.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { FilterRole } from './dto/query-role.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@Body() req: FilterRole) {
    const filter = new FilterRole();
    filter.name = req.name || '';
    filter.nameLocal = req.nameLocal || '';
    filter.orderBy = req.orderBy || 'DESC';
    filter.take = req.take || 0;
    filter.skip = req.skip || 0;
    filter.searchText = req.searchText || '';
    const { data, error } = await this.rolesService.findAll(filter);
    const { total } = await this.rolesService.count(filter);
    return { data, total };
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
