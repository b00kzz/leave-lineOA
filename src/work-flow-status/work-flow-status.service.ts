import { Injectable } from '@nestjs/common';
import { CreateWorkFlowStatusDto } from './dto/create-work-flow-status.dto';
import { UpdateWorkFlowStatusDto } from './dto/update-work-flow-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkFlowStatus } from 'src/entities/work-flow-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkFlowStatusService {
  constructor(
    @InjectRepository(WorkFlowStatus)
    private readonly statusListRepository: Repository<WorkFlowStatus>,
  ) { }
  create(createWorkFlowStatusDto: CreateWorkFlowStatusDto) {
    return 'This action adds a new workFlowStatus';
  }

  async findAll() {
    return await this.statusListRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} workFlowStatus`;
  }

  update(id: number, updateWorkFlowStatusDto: UpdateWorkFlowStatusDto) {
    return `This action updates a #${id} workFlowStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} workFlowStatus`;
  }
}
