import { Injectable } from '@nestjs/common';

import { Student } from './entities';

import { UserRole } from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class StudentsService {
  constructor(private readonly usersService: UsersService) {}

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
}
