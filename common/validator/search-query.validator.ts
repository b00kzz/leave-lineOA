import { SearchParams } from 'common/interface';
import {
  // ApiBooleanOptionalProperty,
  ApiStringOptionalProperty,
} from 'common/api-spec/decorator';
import { Transform, Type } from 'class-transformer';

export class SearchParamsQuery implements SearchParams {
  @ApiStringOptionalProperty('')
  @Type(() => String)
  q: string | undefined;

  @ApiStringOptionalProperty('')
  @Type(() => String)
  sort_by: string | undefined;

  @ApiStringOptionalProperty('')
  @Type(() => String)
  order_by: string | undefined;

  @ApiStringOptionalProperty('{}')
  @Transform(({ value }) => JSON.parse(value))
  filters: any | undefined;

  // @ApiBooleanOptionalProperty()
  // @Type(() => Boolean)
  // is_export: boolean | undefined;
}
