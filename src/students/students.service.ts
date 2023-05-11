import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, SelectQueryBuilder } from 'typeorm';

import { PageDto, PageMetaDto, PageOptionsDto } from './dto';
import { Student, StudentProfile } from './entities';
import { mapGetOneStudentProfileResponse, mapStudentsResponse } from './mappers.response';

import { StudentResponse, StudentEntity,StudentsResponse, UserRole } from '../types';

import {
  StudentGradesAndEmpExpectationsResponse,
  StudentProfileAndGrades,
  StudentResponse,
  UserRole,
} from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class StudentsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async createStudent(email: string): Promise<Student> {
    const user = await this.usersService.createUser({
      email,
      role: UserRole.STUDENT,
    });
    const student = new Student();
    student.user = user;
    return student.save();
  }

  public getStudentById(id: string): Promise<Student> {
    return Student.findOne({ where: { user: { id } }, relations: { user: true, grades: true } });
  }

  getEmailsFromAddedStudents(addedStudents: StudentEntity[]): string[] {
    return addedStudents.map(student => student.user.email);
  }

  public async getAllStudents(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<StudentGradesAndEmpExpectationsResponse>> {
    const queryBuilder = this.getAllStudentsQuery(pageOptionsDto);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const students = entities.map(entity => mapStudentsResponse(entity));

    const pageMetaDto = plainToInstance(PageMetaDto, { ...pageOptionsDto, itemCount });

    return new PageDto(students, pageMetaDto);
  }

  // eslint-disable-next-line max-lines-per-function
  private getAllStudentsQuery(
    pageOptionsDto: PageOptionsDto,
  ): SelectQueryBuilder<StudentProfileAndGrades> {
    return this.dataSource
      .createQueryBuilder()
      .from(Student, 'student')
      .leftJoinAndSelect('student.grades', 'grades')
      .innerJoinAndSelect('student.profile', 'profile')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .select([
        'student.id',
        'student.createdAt',
        'grades.courseCompletion',
        'grades.courseEngagement',
        'grades.projectDegree',
        'grades.teamProjectDegree',
        'profile.expectedTypeWork',
        'profile.targetWorkCity',
        'profile.expectedContractType',
        'profile.expectedSalary',
        'profile.canTakeApprenticeship',
        'profile.monthsOfCommercialExp',
      ])
      .orderBy(
        'student.createdAt',
        pageOptionsDto.order,
      ) as unknown as SelectQueryBuilder<StudentProfileAndGrades>;
  }

  public async getOneStudent(studentId: string): Promise<StudentResponse> {
    const queryBuilder = await this.getOneStudentQuery(studentId);
    Logger.log({ queryBuilder });
    const student = mapGetOneStudentProfileResponse(queryBuilder);

    return student;
  }

  // eslint-disable-next-line max-lines-per-function
  private getOneStudentQuery(studentId: string): Promise<StudentResponse> {
    return (
      this.dataSource
        .createQueryBuilder()
        .from(Student, 'student')
        .leftJoinAndSelect('student.user', 'user')
        .leftJoinAndSelect('student.grades', 'grades')
        .leftJoinAndSelect('student.profile', 'profile')
        .where('student.id = :id', { id: studentId })
        .select([
          'student.id',
          'student.createdAt',
          'student.updatedAt',
          'user.email',
          'profile',
          'grades',
        ])
        .getOne()
        // eslint-disable-next-line max-lines-per-function
        .then(result => {
          return {
            id: result.id,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            details: {
              profile: {
                firstName: result.profile.firstName,
                lastName: result.profile.lastName,
                githubUsername: result.profile.githubUsername,
                tel: result.profile.tel,
                email: result.user.email,
                bio: result.profile.bio,
              },
              grades: {
                courseCompletion: result.grades.courseCompletion,
                courseEngagement: result.grades.courseEngagement,
                projectDegree: result.grades.projectDegree,
                teamProjectDegree: result.grades.teamProjectDegree,
              },
              portfolio: {
                portfolioUrls: result.profile.portfolioUrls,
                projectUrls: result.profile.projectUrls,
                bonusProjectUrls: result.grades.bonusProjectUrls,
              },
              employmentExpectations: {
                expectedTypeWork: result.profile.expectedTypeWork,
                targetWorkCity: result.profile.targetWorkCity,
                expectedContractType: result.profile.expectedContractType,
                expectedSalary: result.profile.expectedSalary,
                canTakeApprenticeship: result.profile.canTakeApprenticeship,
                monthsOfCommercialExp: result.profile.monthsOfCommercialExp,
              },
              educationAndExperience: {
                education: result.profile.education,
                courses: result.profile.education,
                workExperience: result.profile.education,
              },
            },
          };
        }) as unknown as Promise<StudentResponse>
    );
  }
}
