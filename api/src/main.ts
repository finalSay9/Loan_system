import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .addBearerAuth() // for JWT auth (optional)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  // Security
  app.use(helmet());
  app.use(compression());

  // Global validation — rejects any request body that fails DTO rules
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown fields automatically
      forbidNonWhitelisted: true,
      transform: true, // auto-converts types (string "1" → number 1)
    }),
  );

  // API prefix — all routes become /api/v1/...
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
