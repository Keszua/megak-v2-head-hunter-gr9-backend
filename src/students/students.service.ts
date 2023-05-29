import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { PageOptionsDto } from './dto';
import { Student } from './entities';
import { mapBasicStudentProfileResponse, mapStudentProfileResponse } from './mappers.response';

import {
  BasicStudentResponse,
  PagedBasicStudentResponse,
  PageMetaResponse,
  StudentEntity,
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

  public getStudentByUserId(id: string): Promise<Student> {
    return Student.findOne({
      where: { user: { id } },
      relations: { user: true, grades: true, profile: true },
    });
  }

  getEmailsFromAddedStudents(addedStudents: StudentEntity[]): string[] {
    return addedStudents.map(student => student.user.email);
  }

  public async getStudentById(id: string): Promise<StudentResponse> {
    const student = await Student.findOneOrFail({
      where: { id },
      relations: { user: true, grades: true, profile: true },
    });
    if (!student.profile) {
      throw new NotFoundException('Student profile not found');
    }
    return mapStudentProfileResponse(student);
  }

  private fetchStudents(pageOptionsDto: PageOptionsDto): Promise<[Student[], number]> {
    const { order, take, skip } = pageOptionsDto;

    return this.dataSource
      .createQueryBuilder(Student, 'student')
      .leftJoinAndSelect('student.profile', 'profile')
      .leftJoinAndSelect('student.grades', 'grades')
      .leftJoinAndSelect('student.user', 'user')
      .where('profile.id IS NOT NULL')
      .orderBy('student.createdAt', order)
      .skip(skip)
      .take(take)
      .getManyAndCount();
  }

  private mapStudentsToResponse(students: Student[]): BasicStudentResponse[] {
    return students.map(student => mapBasicStudentProfileResponse(student));
  }

  private createPageMeta(pageOptionsDto: PageOptionsDto, itemCount: number): PageMetaResponse {
    const { page, take } = pageOptionsDto;
    const pageCount = Math.ceil(itemCount / take);

    return {
      page,
      take,
      itemCount,
      pageCount,
      hasNextPage: page < pageCount,
      hasPreviousPage: page > 1,
    };
  }

  public async getAllBasicStudents(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PagedBasicStudentResponse> {
    const [students, itemCount] = await this.fetchStudents(pageOptionsDto);
    const mappedStudents: BasicStudentResponse[] = this.mapStudentsToResponse(students);
    const meta: PageMetaResponse = this.createPageMeta(pageOptionsDto, itemCount);

    return {
      students: mappedStudents,
      meta,
    };
  }
}
