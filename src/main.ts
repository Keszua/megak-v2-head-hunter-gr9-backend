import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('APP_PORT');
  await app.listen(PORT, () => {
    Logger.log(`Server is running on port ${PORT}`);
  });
}
bootstrap();
