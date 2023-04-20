import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule } from 'nestjs-console';

import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminCommand } from './commands/admin.command';
import { envValidationObjectSchema } from './config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationObjectSchema,
    }),
    DatabaseModule,
    UsersModule,
    AdminModule,
    ConsoleModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminCommand],
})
export class AppModule {}
