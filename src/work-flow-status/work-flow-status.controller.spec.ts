import { Test, TestingModule } from '@nestjs/testing';
import { WorkFlowStatusController } from './work-flow-status.controller';
import { WorkFlowStatusService } from './work-flow-status.service';

describe('WorkFlowStatusController', () => {
  let controller: WorkFlowStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkFlowStatusController],
      providers: [WorkFlowStatusService],
    }).compile();

    controller = module.get<WorkFlowStatusController>(WorkFlowStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
