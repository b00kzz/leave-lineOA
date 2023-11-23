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
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('problem')
@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createProblemDto: CreateProblemDto) {
    return this.problemService.create(createProblemDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.problemService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
    return this.problemService.update(+id, updateProblemDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemService.remove(+id);
  }
}
