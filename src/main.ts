import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ApiSpecService } from 'common/api-spec/api-spec.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // replace with your client's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // Swagger loader
  //http://localhost:3000/swagger
  const apiService: ApiSpecService = app.get(ApiSpecService);
  apiService.run(app, 'swagger');
  await app.listen(port);

  await app.startAllMicroservices();
  Logger.log(`Start main service in port ${port}`);
}
bootstrap();
