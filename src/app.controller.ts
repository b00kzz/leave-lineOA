import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './auth/guards/jwt-auth.guard';

@ApiTags('From App Controller')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
