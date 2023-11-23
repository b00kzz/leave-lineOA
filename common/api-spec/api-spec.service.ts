import { INestApplication, Injectable, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorResponse } from './dto/error.dto';

@Injectable()
export class ApiSpecService {
  private readonly apiModels: Type[] = [];
  constructor(private readonly config: ConfigService) {}

  /**
   * @deprecated
   */
  addApiModels(models: Type[]) {
    for (const t of models) {
      this.apiModels.push(t);
    }
  }

  run(app: INestApplication, path: string) {
    const config = new DocumentBuilder()
      .setTitle('Api Specification')
      .setDescription('The API description')
      .setDescription('The API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          // I was also testing it without prefix 'Bearer ' before the JWT
          description: 'Please enter token in following format: Bearer <JWT>',
          name: 'Authorization',
          bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
          scheme: 'Bearer',
          type: 'http', // I`ve attempted type: 'apiKey' too
          in: 'Header',
        },
        'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ErrorResponse, ...this.apiModels],
    });
    SwaggerModule.setup(path, app, document);
  }
}
