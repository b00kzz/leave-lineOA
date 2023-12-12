import { PartialType } from '@nestjs/swagger';
import { CreateUserTimeOffDto } from './create-user-time-of.dto';

export class UpdateUserTimeOffDto extends PartialType(CreateUserTimeOffDto) { }
