import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConsoleModule } from 'nestjs-console';

import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminCommand } from './commands/admin.command';
import { GlobalExceptionFilter, GlobalResponseInterceptor } from './common';
import { envValidationObjectSchema } from './config';
import { mailerConfig } from './config/mailer.config';
import { DatabaseModule } from './database/database.module';
import { StudentsModule } from './students/students.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        ...mailerConfig,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationObjectSchema,
    }),
    DatabaseModule,
    UsersModule,
    AdminModule,
    ConsoleModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AdminCommand,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },
  ],
})
export class AppModule {}
