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
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { StudentGradesService } from './student-grades.service';

import { ImportResultResponse } from '../types';
import {
  csvFileFilter,
  csvFileSchema,
  importStudentsResultResponseSchema,
  unauthorizedExample,
  errorResponseSchema,
  errorCodeDataSchema,
  createResponseSchema,
  importStudentsResultResponseExample,
} from '../utils';

@ApiTags('students')
@ApiUnauthorizedResponse({
  description: 'Unauthorized access',
  schema: errorResponseSchema({
    statusCode: HttpStatus.UNAUTHORIZED,
    exampleData: unauthorizedExample,
    dataSchema: errorCodeDataSchema,
  }),
})
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred while processing the request.',
  schema: errorResponseSchema({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    exampleData: { message: 'Internal server error' },
  }),
})
@Controller('students')
export class StudentsController {
  constructor(private readonly studentGradesService: StudentGradesService) {}

  @ApiOperation({ summary: 'Import students from a CSV file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'CSV file containing student data',
    schema: csvFileSchema,
  })
  @ApiOkResponse({
    description: 'Students imported successfully',
    schema: createResponseSchema({
      statusCode: HttpStatus.OK,
      dataSchema: importStudentsResultResponseSchema,
      exampleData: importStudentsResultResponseExample,
    }),
  })
  @ApiBadRequestResponse({
    description: 'Invalid file type. Only CSV files are allowed.',
    schema: errorResponseSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      exampleData: { message: 'Invalid file type. Only CSV files are allowed.' },
    }),
  })
  @HttpCode(HttpStatus.OK)
  @Post('import')
  @UseInterceptors(FileInterceptor('csv', { fileFilter: csvFileFilter }))
  importStudents(@UploadedFile() csv: Express.Multer.File): Promise<ImportResultResponse> {
    return this.studentGradesService.importStudents(csv.buffer.toString());
  }
}
