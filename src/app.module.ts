import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConsoleModule } from 'nestjs-console';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AdminCommand } from './commands/admin.command';
import { GlobalExceptionFilter, GlobalResponseInterceptor } from './common';
import { envValidationObjectSchema } from './config';
import { DatabaseModule } from './database/database.module';
import { HrModule } from './hr/hr.module';
import { StudentsModule } from './students/students.module';
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
    StudentsModule,
    AuthModule,
    HrModule,
  ],
  controllers: [],
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
  ],
})
export class AppModule {}
