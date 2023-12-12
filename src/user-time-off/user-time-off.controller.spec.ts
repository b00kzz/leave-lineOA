import { Test, TestingModule } from '@nestjs/testing';
import { UserTimeOffController } from './user-time-off.controller';
import { UserTimeOffService } from './user-time-off.service';

describe('UserTimeOfController', () => {
  let controller: UserTimeOffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTimeOffController],
      providers: [UserTimeOffService],
    }).compile();

    controller = module.get<UserTimeOffController>(UserTimeOffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
