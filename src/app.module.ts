import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConsoleModule } from 'nestjs-console';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards';
import { AdminCommand } from './commands/admin.command';
import { GlobalExceptionFilter, GlobalResponseInterceptor } from './common';
import {
  envValidationObjectSchema,
  eventEmmiterConfig,
  getMailerConfig,
  validationPipeOptions,
} from './config';
import { DatabaseModule } from './database/database.module';
import { EmailModule } from './email/email.module';
import { HrModule } from './hr/hr.module';
import { EventsModule } from './orders/events.module';
import { StudentsModule } from './students/students.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMailerConfig,
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(eventEmmiterConfig),
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
    EmailModule,
    EventsModule,
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
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      useFactory: (): ValidationPipe => new ValidationPipe(validationPipeOptions),
    },
  ],
})
export class AppModule {}
