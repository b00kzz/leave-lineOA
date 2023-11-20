import { Test, TestingModule } from '@nestjs/testing';
import { UserdetailController } from './userdetail.controller';
import { UserdetailService } from './userdetail.service';

describe('UserdetailController', () => {
  let controller: UserdetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserdetailController],
      providers: [UserdetailService],
    }).compile();

    controller = module.get<UserdetailController>(UserdetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
