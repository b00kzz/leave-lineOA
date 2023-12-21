import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkFlowCardDto } from './dto/create-work-flow-card.dto';
import { UpdateWorkFlowCardDto } from './dto/update-work-flow-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkFlowCard } from 'src/entities/work-flow-card.entity';
import { Repository } from 'typeorm';
import { WorkFlowStatusService } from 'src/work-flow-status/work-flow-status.service';
import { FilterWorkFlowCard } from './dto/query-wf-card';

@Injectable()
export class WorkFlowCardService {
  constructor(
    @InjectRepository(WorkFlowCard)
    private readonly workFlowCardRepository: Repository<WorkFlowCard>,
    private readonly workFlowStatusSvc: WorkFlowStatusService,
  ) { }

  async create(createWFCard: CreateWorkFlowCardDto) {
    return this.workFlowCardRepository.save(createWFCard);
  }

  async findAll(query: FilterWorkFlowCard): Promise<any> {
    const { page, limit, searchText, orderBy } = query;
    const offset = (page - 1) * limit;
    const order = { id: orderBy ? orderBy : 'DESC' }
    const queryBuilder = this.workFlowCardRepository.createQueryBuilder('card_list');
    if (searchText) {
      const searchInt: number = parseInt(searchText);
      if (!Number.isNaN(searchInt)) {
        queryBuilder.where('card_list.userId = :searchInt', { searchInt: searchInt })
        // .orWhere('card_list.step = :searchInt', { searchInt: searchInt })
      } else {
        queryBuilder.where('card_list.work_flow_type = :searchText', { searchText: searchText })
          .orWhere('card_list.work_flow_type = :searchText', { searchText: searchText })
      }
    }
    if (offset) {
      //เลขหน้า
      queryBuilder.skip(offset);
    }
    if (limit) {
      //จำนวนข้อมูลที่แสดง
      queryBuilder.take(limit);
    }
    queryBuilder.orderBy(order);
    const [data, total] = await queryBuilder.getManyAndCount();
    const newData: any[] = data
    const statusList = await this.workFlowStatusSvc.findAll();
    newData.forEach(card => {
      card.statusList = statusList.filter(status => status.work_flow_code === card.work_flow_code);
      return card
    });
    return { data: newData, total };
  }

  async findOne(id: number) {
    return this.workFlowCardRepository.findOne({ where: { id } });
  }

  async update(id: number, updateWorkFlowCardDto: UpdateWorkFlowCardDto) {
    const wfCard = await this.workFlowCardRepository.findOne({ where: { id } });
    if (wfCard) {
      try {
        const update = Object.assign(wfCard, updateWorkFlowCardDto);
        return await this.workFlowCardRepository.save(update);
      } catch (error) {
        throw new NotFoundException({ massage: `fail to update` });
      }
    }
  }
}
