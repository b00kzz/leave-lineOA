import { Module } from '@nestjs/common';
import { UserLeaveQuantityService } from './user-leave-quantity.service';
import { UserLeaveQuantityController } from './user-leave-quantity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLeaveQuantity } from 'src/entities/user-leave-quantity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLeaveQuantity])],
  controllers: [UserLeaveQuantityController],
  providers: [UserLeaveQuantityService],
})
export class UserLeaveQuantityModule { }
