import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule } from 'nestjs-console';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AdminCommand } from './commands/admin.command';
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
  providers: [AdminCommand],
})
export class AppModule {}
