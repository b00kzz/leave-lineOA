import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type as TypeDecorator } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiNumberProperty } from '../decorator';

export class Response<T> {
  @ApiNumberProperty(200)
  statusCode: number;

  data: T;
}

export function ResultResponse<T>(classRef: Type<T>): Type<Response<T>>;
export function ResultResponse<T>(classRef: [Type<T>]): Type<Response<T[]>>;
export function ResultResponse<T>(
  classRef: Type<T> | [Type<T>],
): Type<Response<T | T[]>> {
  const isArray = Array.isArray(classRef);

  class ResultResponseClass extends Response<T | T[]> {
    @ApiProperty({
      type: classRef,
    })
    @TypeDecorator(() => (isArray ? classRef[0] : classRef))
    @ValidateNested({ each: isArray })
    data: T | T[];
  }

  return ResultResponseClass as Type<Response<T | T[]>>;
}

export class Pagination {
  @ApiNumberProperty(1)
  pageSize: number;

  @ApiNumberProperty(1)
  current: number;

  @ApiNumberProperty(1)
  total: number;
}

export class PaginationResponse<T> {
  @ApiNumberProperty(200)
  statusCode: number;

  @ApiProperty({ type: Pagination })
  pagination: Pagination;

  data: T[];
}

export function PaginationResultResponse<T>(
  classRef: Type<T>,
): Type<PaginationResponse<T>> {
  class PaginationResultResponseClass extends PaginationResponse<T> {
    @ApiProperty({
      type: [classRef],
    })
    @TypeDecorator(() => classRef)
    @ValidateNested({ each: true })
    data: T[];
  }

  return PaginationResultResponseClass;
}
