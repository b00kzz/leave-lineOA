import { Module } from '@nestjs/common';
import { UserdetailService } from './userdetail.service';
import { UserdetailController } from './userdetail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userdetail } from 'src/entities/userdetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userdetail])],
  controllers: [UserdetailController],
  providers: [UserdetailService],
})
export class UserdetailModule {}
