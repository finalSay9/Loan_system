import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS — allows frontend and mobile to talk to this API
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Global validation — rejects any request body that fails DTO rules
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // strips unknown fields automatically
      forbidNonWhitelisted: true, // throws error if unknown fields are sent
      transform: true,            // auto-converts types (string "1" → number 1)
    }),
  );

  // API prefix — all routes become /api/v1/...
  app.setGlobalPrefix('api/v1');

  // Swagger — must come after setGlobalPrefix
  const config = new DocumentBuilder()
    .setTitle('Loan Management API')
    .setDescription('Core API for loan applications, payments and user management')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // this name is referenced in @ApiBearerAuth() decorators
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // available at /docs

  const port = process.env.PORT ?? 3200;
  await app.listen(port);

  Logger.log(
    `Application running on http://localhost:${port}/api/v1`,
    'Bootstrap',
  );
  Logger.log(
    `Swagger docs at http://localhost:${port}/docs`,
    'Bootstrap',
  );
}

bootstrap();