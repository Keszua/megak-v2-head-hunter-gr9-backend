import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Head Hunter API')
  .setTitle('Dokumentacja API Head Hunter ')
  .setVersion('1.0')
  .build();
