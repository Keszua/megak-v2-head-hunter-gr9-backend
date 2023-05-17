import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateStudentProfileDto, PageOptionsDto } from './dto';
import { StudentGradesService } from './student-grades.service';
import { StudentsProfilesService } from './students-profiles.service';
import { StudentsService } from './students.service';
import {
  getAllStudentsOkResponse,
  getStudentNotFoundResponse,
  getStudentOkResponse,
  importStudentsBadRequestResponse,
  importStudentsOkResponse,
  studentProfileCreatedResponse,
} from './students.swagger.response';

import { CurrentUser } from '../common';
import { ImportResultResponse, PagedBasicStudentResponse, StudentResponse } from '../types';
import { User } from '../users/entities/user.entity';
import {
  CommonApiInternalServerErrorResponse,
  CommonApiUnauthorizedResponse,
  csvFileFilter,
  csvFileSchema,
} from '../utils';

@ApiTags('Students')
@CommonApiUnauthorizedResponse()
@CommonApiInternalServerErrorResponse()
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentGradesService: StudentGradesService,
    private readonly studentsProfilesService: StudentsProfilesService,
    private readonly studentsService: StudentsService,
  ) {}

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

  @ApiOperation({ summary: 'Create student profile' })
  @ApiCreatedResponse(studentProfileCreatedResponse)
  @ApiBody({ type: CreateStudentProfileDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('/profile')
  createProfile(
    @Body() createStudentProfileDto: CreateStudentProfileDto,
    @CurrentUser() user: User,
  ): Promise<StudentResponse> {
    return this.studentsProfilesService.createAndValidateStudentProfile(
      createStudentProfileDto,
      user,
    );
  }

  @ApiOperation({ summary: 'Return an array of all basic data students' })
  @ApiOkResponse(getAllStudentsOkResponse)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  getAllBasicStudents(@Query() pageOptionsDto: PageOptionsDto): Promise<PagedBasicStudentResponse> {
    return this.studentsService.getAllBasicStudents(pageOptionsDto);
  }

  @ApiOperation({ summary: 'Return one student.' })
  @ApiOkResponse(getStudentOkResponse)
  @ApiNotFoundResponse(getStudentNotFoundResponse)
  @HttpCode(HttpStatus.OK)
  @Get('/:studentId')
  getOneStudent(@Param('studentId') studentId: string): Promise<StudentResponse> {
    return this.studentsService.getStudentById(studentId);
  }
}
