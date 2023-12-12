import { PartialType } from '@nestjs/swagger';
import { CreateHolidayDto } from './create-holiday.dto';
import { IsOptional } from 'class-validator';

export class UpdateHolidayDto extends PartialType(CreateHolidayDto) {
}
