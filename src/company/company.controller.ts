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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
