import { Test, TestingModule } from '@nestjs/testing';
import { UserTimeOffService } from './user-time-off.service';

describe('UserTimeOfService', () => {
  let service: UserTimeOffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTimeOffService],
    }).compile();

    service = module.get<UserTimeOffService>(UserTimeOffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
