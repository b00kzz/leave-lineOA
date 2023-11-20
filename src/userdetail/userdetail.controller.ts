import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserdetailService } from './userdetail.service';
import { CreateUserdetailDto } from './dto/create-userdetail.dto';
import { UpdateUserdetailDto } from './dto/update-userdetail.dto';

@Controller('userdetail')
export class UserdetailController {
  constructor(private readonly userdetailService: UserdetailService) {}

  @Post()
  create(@Body() createUserdetailDto: CreateUserdetailDto) {
    return this.userdetailService.create(createUserdetailDto);
  }

  @Get()
  findAll() {
    return this.userdetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userdetailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserdetailDto: UpdateUserdetailDto,
  ) {
    return this.userdetailService.update(+id, updateUserdetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userdetailService.remove(+id);
  }
}
