import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { StudentGradesService } from './student-grades.service';
import { StudentsService } from './students.service';

import { ImportResultResponse } from '../types';
import { csvFileFilter } from '../utils/csv-file-filter';

// TODO add swagger
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentGradesService: StudentGradesService,
    private readonly studentsService: StudentsService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('import')
  @UseInterceptors(FileInterceptor('csv', { fileFilter: csvFileFilter }))
  importStudents(@UploadedFile() csv: Express.Multer.File): Promise<ImportResultResponse> {
    return this.studentGradesService.importStudents(csv.buffer.toString());
  }
}
