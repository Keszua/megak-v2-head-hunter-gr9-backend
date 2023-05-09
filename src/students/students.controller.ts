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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateStudentProfileDto, PageDto, PageOptionsDto } from './dto';
import { Student } from './entities';
import { StudentGradesService } from './student-grades.service';
import { StudentsProfilesService } from './students-profiles.service';
import { StudentsService } from './students.service';
import {
  getAllStudentsOkResponse,
  getStudentOkResponse,
  importStudentsBadRequestResponse,
  importStudentsOkResponse,
  studentProfileCreatedResponse,
} from './students.swagger.response';

import { CurrentUser } from '../common';
import { ImportResultResponse, StudentResponse, StudentsResponse } from '../types';
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

  @ApiOperation({ summary: 'Return an array of all students' })
  @ApiOkResponse(getAllStudentsOkResponse)
  @HttpCode(HttpStatus.OK)
  @Get('/all-students')
  getAllStudents(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<StudentsResponse>> {
    return this.studentsService.getAllStudents(pageOptionsDto);
  }

  @ApiOperation({ summary: 'Return one student.' })
  @ApiOkResponse(getStudentOkResponse)
  @HttpCode(HttpStatus.OK)
  @Get('/:studentId')
  getOneStudents(@Param('studentId') studentId: string): Promise<StudentResponse> {
    return this.studentsService.getOneStudent(studentId);
  }
}
