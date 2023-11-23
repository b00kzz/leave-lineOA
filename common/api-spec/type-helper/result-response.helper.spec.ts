import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ModelPropertiesAccessor } from '@nestjs/swagger/dist/services/model-properties-accessor';
import { DECORATORS } from '@nestjs/swagger/dist/constants';
import {
  Pagination,
  PaginationResultResponse,
  ResultResponse,
} from './result-response.helper';
class UserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

describe('ResultResponse', () => {
  class UserDtoResponse extends ResultResponse(UserDto) {}

  let modelPropertiesAccessor: ModelPropertiesAccessor;

  beforeEach(() => {
    modelPropertiesAccessor = new ModelPropertiesAccessor();
  });

  describe('OpenAPI metadata', () => {
    it('should return extended result response of dto', () => {
      const prototype = UserDtoResponse.prototype as any as Type<unknown>;

      modelPropertiesAccessor.applyMetadataFactory(prototype);
      expect(modelPropertiesAccessor.getModelProperties(prototype)).toEqual([
        'statusCode',
        'data',
      ]);
    });

    it('data should be a same as user dto', () => {
      const prototype = UserDtoResponse.prototype as any as Type<unknown>;

      const userDtoMetadata = Reflect.getMetadata(
        DECORATORS.API_MODEL_PROPERTIES,
        prototype,
        'data',
      );

      expect(userDtoMetadata.type).toEqual(UserDto);
    });
  });
});

describe('PaginationResultResponse', () => {
  class UsersPaginationResponse extends PaginationResultResponse(UserDto) {}
  let modelPropertiesAccessor: ModelPropertiesAccessor;

  beforeEach(() => {
    modelPropertiesAccessor = new ModelPropertiesAccessor();
  });

  describe('OpenAPI metadata', () => {
    it('should return extended result response of dto', () => {
      const prototype =
        UsersPaginationResponse.prototype as any as Type<unknown>;

      modelPropertiesAccessor.applyMetadataFactory(prototype);
      expect(modelPropertiesAccessor.getModelProperties(prototype)).toEqual([
        'statusCode',
        'pagination',
        'data',
      ]);
    });

    it('should have a pagination object in response', () => {
      const prototype =
        UsersPaginationResponse.prototype as any as Type<unknown>;

      modelPropertiesAccessor.applyMetadataFactory(prototype);
      const paginationMetadata = Reflect.getMetadata(
        DECORATORS.API_MODEL_PROPERTIES,
        prototype,
        'pagination',
      );

      expect(paginationMetadata.type).toEqual(Pagination);
    });

    it('data should be a same as user dto', () => {
      const prototype =
        UsersPaginationResponse.prototype as any as Type<unknown>;

      const userDtoMetadata = Reflect.getMetadata(
        DECORATORS.API_MODEL_PROPERTIES,
        prototype,
        'data',
      );

      expect(userDtoMetadata.type).toEqual(UserDto);
      expect(userDtoMetadata.isArray).toBeTruthy();
    });
  });
});
