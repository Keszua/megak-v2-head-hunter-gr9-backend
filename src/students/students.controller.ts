import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { StudentGradesService } from './student-grades.service';
import {
  importStudentsBadRequestResponse,
  importStudentsOkResponse,
} from './students.swagger.response';

import { ImportResultResponse } from '../types';
import {
  csvFileFilter,
  csvFileSchema,
  CommonApiInternalServerErrorResponse,
  CommonApiUnauthorizedResponse,
} from '../utils';

@ApiTags('Students')
@CommonApiUnauthorizedResponse()
@CommonApiInternalServerErrorResponse()
@Controller('students')
export class StudentsController {
  constructor(private readonly studentGradesService: StudentGradesService) {}

  @ApiOperation({ summary: 'Import students from a CSV file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'CSV file containing student data',
    schema: csvFileSchema,
  })
  @ApiOkResponse(importStudentsOkResponse)
  @ApiBadRequestResponse(importStudentsBadRequestResponse)
  @HttpCode(HttpStatus.OK)
  @Post('import')
  @UseInterceptors(FileInterceptor('csv', { fileFilter: csvFileFilter }))
  importStudents(@UploadedFile() csv: Express.Multer.File): Promise<ImportResultResponse> {
    return this.studentGradesService.importStudents(csv.buffer.toString());
  }
}
