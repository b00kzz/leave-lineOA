import { Module } from '@nestjs/common';
import { LeaveRequestsService } from './leave-requests.service';
import { LeaveRequestsController } from './leave-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from 'src/entities/leave-request.entity';
import { WorkFlowCard } from 'src/entities/work-flow-card.entity';
import { WorkFlowStatus } from 'src/entities/work-flow-status.entity';
import { WorkFlowCardService } from 'src/work-flow-card/work-flow-card.service';
import { WorkFlowStatusService } from 'src/work-flow-status/work-flow-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest, WorkFlowCard, WorkFlowStatus])],
  controllers: [LeaveRequestsController],
  providers: [LeaveRequestsService, WorkFlowCardService, WorkFlowStatusService],
})
export class LeaveRequestsModule { }
