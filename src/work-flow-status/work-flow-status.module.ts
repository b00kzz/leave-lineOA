import { Module } from '@nestjs/common';
import { WorkFlowStatusService } from './work-flow-status.service';
import { WorkFlowStatusController } from './work-flow-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkFlowStatus } from 'src/entities/work-flow-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkFlowStatus])],
  controllers: [WorkFlowStatusController],
  providers: [WorkFlowStatusService],
})
export class WorkFlowStatusModule { }
