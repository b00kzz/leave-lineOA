import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';
import { ApiNumberOptionalProperty } from 'common/api-spec/decorator/api-properties.decorator';

export class PaginationQuery {
  @ApiNumberOptionalProperty(20)
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  pageSize: number = 20;

  @ApiNumberOptionalProperty(1)
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  current: number = 1;
}
