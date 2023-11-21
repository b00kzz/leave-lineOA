import { Test, TestingModule } from '@nestjs/testing';
import { UserTeamController } from './user_team.controller';
import { UserTeamService } from './user_team.service';

describe('UserTeamController', () => {
  let controller: UserTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTeamController],
      providers: [UserTeamService],
    }).compile();

    controller = module.get<UserTeamController>(UserTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
