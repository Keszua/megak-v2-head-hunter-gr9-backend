import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student, StudentGrades, StudentProfile } from './entities';
import { StudentGradesService } from './student-grades.service';
import { StudentsProfilesService } from './students-profiles.service';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { EventsModule } from '../events/events.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, StudentGrades, StudentProfile]),
    UsersModule,
    EventsModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService, StudentGradesService, StudentsProfilesService],
})
export class StudentsModule {}
