import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

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
    const queryBuilder = this.dataSource
      .createQueryBuilder()
      .select('student')
      .from(Student, 'student')
      .orderBy('student.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities: students } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(students, pageMetaDto);
  }
}
