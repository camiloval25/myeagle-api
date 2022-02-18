import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { startSwagger } from './app.swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log(`Intentando conectar a: ${process.env.DATABASE_HOST}`);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  startSwagger(app);
  await app.listen(process.env.SERVER_PORT || 3000);
  logger.log(`Servidor ejecutando en: ${await app.getUrl()}`);
  logger.log(
    `Base de Datos conectada en: ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
  );
}
bootstrap();
