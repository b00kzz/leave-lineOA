import { PartialType } from '@nestjs/swagger';
import { CreateUserLeaveQuantityDto } from './create-user-leave-quantity.dto';

export class UpdateUserLeaveQuantityDto extends PartialType(CreateUserLeaveQuantityDto) {}
