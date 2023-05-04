import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { EmailEmitter } from 'src/orders';
import { EventsModule } from 'src/orders/events.module';

import { Student, StudentGrades } from './entities';
import { StudentGradesService } from './student-grades.service';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, StudentGrades]),
    UsersModule,
    EventsModule,
    EmailModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentGradesService, EmailEmitter],
})
export class StudentsModule {}
