import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiListResultOkResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          statusCode: {
            type: 'number',
            example: 200,
          },
          meta: {
            type: 'object',
            properties: {
              offset: {
                type: 'number',
                example: 0,
              },
              limit: {
                type: 'number',
                example: 20,
              },
              total: {
                type: 'number',
                example: 120,
              },
            },
          },
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(model) },
          },
        },
      },
    }),
  );
};
