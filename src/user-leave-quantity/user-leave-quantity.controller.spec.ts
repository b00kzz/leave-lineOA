import { Test, TestingModule } from '@nestjs/testing';
import { UserLeaveQuantityController } from './user-leave-quantity.controller';
import { UserLeaveQuantityService } from './user-leave-quantity.service';

describe('UserLeaveQuantityController', () => {
  let controller: UserLeaveQuantityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLeaveQuantityController],
      providers: [UserLeaveQuantityService],
    }).compile();

    controller = module.get<UserLeaveQuantityController>(UserLeaveQuantityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
