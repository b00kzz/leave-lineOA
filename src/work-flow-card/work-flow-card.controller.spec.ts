import { Test, TestingModule } from '@nestjs/testing';
import { WorkFlowCardController } from './work-flow-card.controller';
import { WorkFlowCardService } from './work-flow-card.service';

describe('WorkFlowCardController', () => {
  let controller: WorkFlowCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkFlowCardController],
      providers: [WorkFlowCardService],
    }).compile();

    controller = module.get<WorkFlowCardController>(WorkFlowCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
