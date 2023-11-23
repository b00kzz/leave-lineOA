import {
  ApiNumberProperty,
  ApiStringOptionalProperty,
  ApiStringProperty,
} from '../decorator';

export class ErrorResponse {
  @ApiNumberProperty(500)
  statusCode: number;

  @ApiStringProperty('Internal Server Error')
  error: string;

  @ApiStringOptionalProperty('error')
  message: string;
}
