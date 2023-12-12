import { Module } from '@nestjs/common';
import { UserTimeOffService } from './user-time-off.service';
import { UserTimeOffController } from './user-time-off.controller';
import { UserTimeOff } from 'src/entities/user-time-off.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserTimeOff])],
  controllers: [UserTimeOffController],
  providers: [UserTimeOffService],
})
export class UserTimeOffModule { }
