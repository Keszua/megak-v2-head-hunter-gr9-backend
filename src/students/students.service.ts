import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Student } from './entities';
import { mapStudentProfileResponse } from './mappers.response';

import { StudentEntity, StudentResponse, UserRole } from '../types';
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
    return Student.findOne({ where: { user: { id } }, relations: { user: true, grades: true } });
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
}
