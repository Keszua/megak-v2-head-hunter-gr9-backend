import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student, StudentGrades } from './entities';
import { StudentGradesService } from './student-grades.service';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student, StudentGrades])],
  controllers: [StudentsController],
  providers: [StudentsService, StudentGradesService],
})
export class StudentsModule {}
