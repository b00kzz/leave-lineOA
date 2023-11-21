import { IsNumber } from 'class-validator';

export class CreateUserTeamDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  teamId: number;
}
