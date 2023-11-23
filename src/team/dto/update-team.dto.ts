import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
