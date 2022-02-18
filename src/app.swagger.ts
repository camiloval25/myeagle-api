import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const startSwagger = (app: INestApplication) => {
  const swaggerConfiguration = new DocumentBuilder()
    .setTitle('MyEagleDev - API v1.0.0 🚀')
    .addBearerAuth()
    .setDescription('Documentación API Software MyEagleDev 🔥')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfiguration);
  SwaggerModule.setup('/documentacion', app, document);
};
