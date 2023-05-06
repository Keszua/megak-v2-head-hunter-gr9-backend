import { Injectable } from '@nestjs/common';
import { LinksService } from 'src/tokens/links.service';

import { Student } from './entities';

import { UserRole } from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class StudentsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly linksService: LinksService,
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

  public async sendActivationEmails(email: string[]): Promise<void> {
    const urls = await this.linksService.createRegisterUrls(email);
    await this.linksService.sendRegisterConfirmation(urls);
  }
}
