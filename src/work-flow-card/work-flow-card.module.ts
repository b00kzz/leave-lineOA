import { Module } from '@nestjs/common';
import { WorkFlowCardService } from './work-flow-card.service';
import { WorkFlowCardController } from './work-flow-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkFlowCard } from 'src/entities/work-flow-card.entity';
import { WorkFlowStatus } from 'src/entities/work-flow-status.entity';
import { WorkFlowStatusService } from 'src/work-flow-status/work-flow-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkFlowCard, WorkFlowStatus])],
  controllers: [WorkFlowCardController],
  providers: [WorkFlowCardService, WorkFlowStatusService],
})
export class WorkFlowCardModule { }
