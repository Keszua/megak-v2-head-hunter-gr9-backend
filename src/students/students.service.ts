import { Injectable } from '@nestjs/common';
import { DataSource, SelectQueryBuilder } from 'typeorm';

import { PageDto, PageMetaDto, PageOptionsDto } from './dto';
import { Student } from './entities';

import { UserRole } from '../types';
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

  public async getAllStudents(pageOptionsDto: PageOptionsDto): Promise<PageDto<Student>> {
    const queryBuilder = this.getAllStudentsQuery(pageOptionsDto);
    const itemCount = await queryBuilder.getCount();
    const { entities: students } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(students, pageMetaDto);
  }

  private getAllStudentsQuery(pageOptionsDto: PageOptionsDto): SelectQueryBuilder<Student> {
    return this.dataSource
      .createQueryBuilder()
      .from(Student, 'student')
      .leftJoinAndSelect('student.grades', 'grades')
      .leftJoinAndSelect('student.profile', 'profile')
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
      .orderBy('student.createdAt', pageOptionsDto.order);
  }
}
