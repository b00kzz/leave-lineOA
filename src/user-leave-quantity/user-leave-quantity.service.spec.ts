import { Test, TestingModule } from '@nestjs/testing';
import { UserLeaveQuantityService } from './user-leave-quantity.service';

describe('UserLeaveQuantityService', () => {
  let service: UserLeaveQuantityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLeaveQuantityService],
    }).compile();

    service = module.get<UserLeaveQuantityService>(UserLeaveQuantityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
