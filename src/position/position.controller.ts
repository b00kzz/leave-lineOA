import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { FilterPosition } from './dto/query-position.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) { }

  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionService.create(createPositionDto);
  }

  @Patch()
  async findAll(@Body() filter: FilterPosition): Promise<any> {
    try {
      const result = await this.positionService.findAll(filter);
      return { success: true, data: result.data, total: result.total };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionService.remove(+id);
  }
}
