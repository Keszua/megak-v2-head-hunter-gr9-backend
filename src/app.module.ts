import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConsoleModule } from 'nestjs-console';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards';
import { AdminCommand } from './commands/admin.command';
import { GlobalExceptionFilter, GlobalResponseInterceptor } from './common';
import { envValidationObjectSchema, mailerConfig } from './config';
import { DatabaseModule } from './database/database.module';
import { HrModule } from './hr/hr.module';
import { MailModule } from './mail/mail.module';
import { StudentsModule } from './students/students.module';
import { TokensModule } from './tokens/tokens.module';
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
    AuthModule,
    TokensModule,
    HrModule,
    MailModule,
  ],
  providers: [
    AdminCommand,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
