import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Head Hunter API')
  .setTitle('Head Hunter API documentation')
  .setVersion('1.0')
  .build();
