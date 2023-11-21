import { Module } from '@nestjs/common';
import { UserTeamService } from './user_team.service';
import { UserTeamController } from './user_team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTeam } from 'src/entities/user_team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTeam])],
  controllers: [UserTeamController],
  providers: [UserTeamService],
})
export class UserTeamModule {}
