import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { DiscriminatorDescriptor, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export const ApiDateTimeProperty = (
  option: { isOptional: boolean } = { isOptional: false },
) => {
  return applyDecorators(
    option.isOptional
      ? ApiPropertyOptional({ type: Date, example: new Date().toISOString() })
      : ApiProperty({
          type: Date,
          example: new Date().toISOString(),
        }),
  );
};

export const ApiEmailProperty = (
  example: string | undefined = 'user1@local.com',
  description: string | undefined = undefined,
) => {
  return applyDecorators(
    ApiProperty({
      type: String,
      example,
      description,
    }),
  );
};

export const ApiEmailOptionalProperty = (
  example: string | undefined = 'user1@local.com',
  description: string | undefined = undefined,
) => {
  return applyDecorators(
    ApiPropertyOptional({
      type: String,
      example,
      description,
    }),
  );
};

export const ApiNumberProperty = (
  example: number | undefined = 0,
  description: string | undefined = undefined,
) => {
  return applyDecorators(
    ApiProperty({
      type: Number,
      example,
      description,
    }),
    IsNumber(),
    Type(() => Number),
  );
};

export const ApiNumberOptionalProperty = (
  example: number | null | undefined = 0,
  description: string | undefined = undefined,
) => {
  return applyDecorators(
    ApiPropertyOptional({
      type: Number,
      example,
      description,
    }),
    IsNumber(),
    IsOptional(),
  );
};

export const ApiStringProperty = (
  example: string | undefined = 'string',
  description: string | undefined = undefined,
  isRequired: boolean | undefined = undefined,
) => {
  return applyDecorators(
    ApiProperty({
      type: String,
      example,
      description,
    }),
    IsString(),
  );
};

export const ApiImageUrlProperty = (
  option: {
    isOptional: boolean;
    example?: string | undefined;
    description?: string | undefined;
  } = {
    isOptional: false,
    example: 'https://127.0.0.1/images/image1.png',
    description: undefined,
  },
) => {
  return applyDecorators(
    option.isOptional
      ? ApiPropertyOptional({
          type: String,
          example: option.example ?? 'https://127.0.0.1/images/image1.png',
          description: option.description,
        })
      : ApiProperty({
          type: String,
          example: option.example ?? 'https://127.0.0.1/images/image1.png',
          description: option.description,
        }),
  );
};

export const ApiFileUrlProperty = (
  option: {
    isOptional: boolean;
    example: string | undefined;
    description: string | undefined;
  } = {
    isOptional: false,
    example: 'https://127.0.0.1/sample.pdf',
    description: undefined,
  },
) => {
  return applyDecorators(
    option.isOptional
      ? ApiPropertyOptional({
          type: String,
          example: option.example,
          description: option.description,
        })
      : ApiProperty({
          type: String,
          example: option.example,
          description: option.description,
        }),
  );
};

export const ApiStringOptionalProperty = (
  example: string | undefined = 'string',
  description: string | undefined = undefined,
) => {
  return applyDecorators(
    ApiPropertyOptional({
      type: String,
      example,
      description,
    }),
    IsOptional(),
  );
};

export const ApiBooleanProperty = (
  example: boolean = false,
  description?: string,
) => {
  return applyDecorators(
    ApiPropertyOptional({
      type: Boolean,
      example,
      description,
    }),
  );
};

export const ApiBooleanOptionalProperty = (
  example?: boolean,
  description?: string,
) => {
  return applyDecorators(
    ApiPropertyOptional({
      type: Boolean,
      example,
      description,
    }),
    IsOptional(),
  );
};

export const ApiEnumProperty = <E extends Record<string, string>>(
  enumType: E,
  example?: E[keyof E],
) => {
  const _example = example ?? Object.values(enumType)?.[0];
  return applyDecorators(
    ApiProperty({
      enum: enumType,
      example: _example,
    }),
    IsEnum(enumType),
  );
};

export const ApiEnumOptionalProperty = <E extends Record<string, string>>(
  enumType: E,
  example?: E[keyof E],
) => {
  const _example = example ?? Object.values(enumType)?.[0];
  return applyDecorators(
    ApiPropertyOptional({
      enum: enumType,
      example: _example,
    }),
    IsEnum(enumType),
    IsOptional(),
  );
};

export const ApiDiscriminatorTypeArrayProperty = (BaseType: Function, discriminator: DiscriminatorDescriptor) => {
  const models = [
    BaseType,
    ...discriminator.subTypes.map(subType => subType.value),
  ];

  const apiItems: SchemaObject['items'] = {
    oneOf: models.map(Type => ({
      $ref: getSchemaPath(Type),
    })),
  };

  return applyDecorators(
    ApiProperty({
      type: 'array',
      items: apiItems,
    }),
    Type(() => BaseType, { discriminator }),
    /**
     * Make ApiExtraModels excute on property decorator
     * In the nestjs/swagger version 5.2.1 doesn't support ApiExtraModels
     * decorator on property
     */
    (target: any, propertyKey: string) => {
      const decorate = ApiExtraModels(...models);
      return decorate(target.constructor, propertyKey);
    },
  );
};
