import { Test, TestingModule } from '@nestjs/testing';
import { WorkFlowStatusService } from './work-flow-status.service';

describe('WorkFlowStatusService', () => {
  let service: WorkFlowStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkFlowStatusService],
    }).compile();

    service = module.get<WorkFlowStatusService>(WorkFlowStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
