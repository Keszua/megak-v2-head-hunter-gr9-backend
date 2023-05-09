import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, SelectQueryBuilder } from 'typeorm';

import { PageDto, PageMetaDto, PageOptionsDto } from './dto';
import { Student } from './entities';
import { mapStudentsResponse } from './mappers.response';

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

  getStudentById(id: string): Promise<Student> {
    return Student.findOne({ where: { user: { id } }, relations: { user: true, grades: true } });
  }

  getEmailsFromAddedStudents(addedStudents: Student[]): string[] {
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

  // eslint-disable-next-line max-lines-per-function
  public async getOneStudent(studentId: string): Promise<StudentResponse> {
    const student = await this.getOneStudentQuery(studentId);
    const studentResponse: StudentResponse = {
      studentId: student.id,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
      details: {
        profile: {
          firstName: student.profile.firstName,
          lastName: student.profile.lastName,
          githubUsername: student.profile.githubUsername,
          tel: student.profile.tel,
          email: student.user.email,
          bio: student.profile.bio,
        },
        grades: {
          courseCompletion: student.grades.courseCompletion,
          courseEngagement: student.grades.courseEngagement,
          projectDegree: student.grades.projectDegree,
          teamProjectDegree: student.grades.teamProjectDegree,
        },
        portfolio: {
          portfolioUrls: student.profile.portfolioUrls,
          projectUrls: student.profile.projectUrls,
          bonusProjectUrls: student.grades.bonusProjectUrls,
        },
        employmentExpectations: {
          expectedTypeWork: student.profile.expectedTypeWork,
          targetWorkCity: student.profile.targetWorkCity,
          expectedContractType: student.profile.expectedContractType,
          expectedSalary: student.profile.expectedSalary,
          canTakeApprenticeship: student.profile.canTakeApprenticeship,
          monthsOfCommercialExp: student.profile.monthsOfCommercialExp,
        },
        educationAndExperience: {
          education: student.profile.education,
          courses: student.profile.courses,
          workExperience: student.profile.workExperience,
        },
      },
    };
    return studentResponse;
  }

  private getOneStudentQuery(studentId: string): Promise<Student> {
    return this.dataSource
      .createQueryBuilder()
      .from(Student, 'student')
      .where('student.id = :id', { id: studentId })
      .leftJoinAndSelect('student.user', 'user')
      .leftJoinAndSelect('student.grades', 'grades')
      .leftJoinAndSelect('student.profile', 'profile')
      .select(['student.id', 'user.email', 'grades', 'profile'])
      .getOne();
  }
}
