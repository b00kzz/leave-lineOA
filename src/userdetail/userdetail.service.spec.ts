import { Test, TestingModule } from '@nestjs/testing';
import { UserdetailService } from './userdetail.service';

describe('UserdetailService', () => {
  let service: UserdetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserdetailService],
    }).compile();

    service = module.get<UserdetailService>(UserdetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
