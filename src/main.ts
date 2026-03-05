import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configValidationPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  });
  const configDocument = new DocumentBuilder()
    .setTitle('Task Management App')
    .setDescription('The Task Management App API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configDocument);

  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(configValidationPipe);
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
