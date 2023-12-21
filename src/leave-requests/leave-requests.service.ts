import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { LeaveRequest } from 'src/entities/leave-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterLeaveReq } from './dto/query-leave-req.dto';
import { Repository } from 'typeorm';
import { WorkFlowCardService } from 'src/work-flow-card/work-flow-card.service';

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveReqRepository: Repository<LeaveRequest>,
    private readonly workFlowCardSvc: WorkFlowCardService,
  ) { }

  async create(create: CreateLeaveRequestDto): Promise<any> {
    const randomCode = Math.floor(Math.random() * 90) + 10;
    const year = new Date().getFullYear() % 100
    const day = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(new Date().getDate());
    const month = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(new Date().getMonth() + 1);
    const hours = new Date().getHours().toString().padStart(2, '0');
    const minutes = new Date().getMinutes().toString().padStart(2, '0');
    const seconds = new Date().getSeconds().toString().padStart(2, '0');
    const code = `${year}${month}${day}${hours}${minutes}${seconds}${randomCode}`;
    const newCreate = { ...create, code: code }
    const leavReq = await this.leaveReqRepository.save(newCreate);
    await this.workFlowCardSvc.create({
      leaveId: leavReq.id,
      work_flow_type: "Request",
      work_flow_code: "WF-01",
      userId: 5
    })
    return leavReq
  }

  async findAll(query: FilterLeaveReq): Promise<any> {
    const { page, limit, searchText, orderBy } = query;
    const offset = (page - 1) * limit;
    const order = { leave_id: orderBy ? orderBy : 'DESC' }
    const queryBuilder = this.leaveReqRepository.createQueryBuilder('leave_request');
    if (searchText) {
      const searchInt: number = parseInt(searchText);
      if (!Number.isNaN(searchInt)) {
        queryBuilder.where('leave_request.leave_type_id = :searchInt', { searchInt: searchInt })
      } else {
        queryBuilder.where('leave_request.status = :searchText', { searchText: searchText })
          .orWhere('leave_request.leave_reason = :searchText', { searchText: searchText })
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
    return { data, total };
  }

  async findAllByUserId(id: number): Promise<any> {
    const queryBuilder = this.leaveReqRepository.createQueryBuilder('leave_request');
    queryBuilder.where('leave_request.user_id = :id', { id });
    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total }; // ส่งค่าเป็น array และจำนวน
  }

  async findOne(id: number): Promise<any> {
    const leave_request = await this.leaveReqRepository.findOne({ where: { id } });
    if (leave_request) {
      return leave_request;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ไม่พบข้อมูล ID: ${id}`,
      });
    }
  }

  async update(id: number, updateHolidayDto: UpdateLeaveRequestDto) {
    const leave_request = await this.leaveReqRepository.findOne({ where: { id } });
    if (leave_request) {
      const update = Object.assign(leave_request, updateHolidayDto);
      return await this.leaveReqRepository.save(update);
    } else {
      throw new NotFoundException();
    }
  }

  async remove(id: number): Promise<any> {
    const user = await this.leaveReqRepository.findOne({ where: { id } });
    if (user) {
      // ทำการอัพเดตคอลัมน์ deletedAt ของ user
      await this.leaveReqRepository.update(id, { deletedAt: new Date() });
      throw new NotFoundException({
        message: `ลบข้อมูล ID: ${id} สำเร็จ`,
        statusCode: HttpStatus.OK,
      });
    } else {
      throw new NotFoundException({
        message: `ไม่พบข้อมูล ID: ${id}`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
}
