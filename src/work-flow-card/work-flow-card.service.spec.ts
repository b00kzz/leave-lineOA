import { Test, TestingModule } from '@nestjs/testing';
import { WorkFlowCardService } from './work-flow-card.service';

describe('WorkFlowCardService', () => {
  let service: WorkFlowCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkFlowCardService],
    }).compile();

    service = module.get<WorkFlowCardService>(WorkFlowCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
