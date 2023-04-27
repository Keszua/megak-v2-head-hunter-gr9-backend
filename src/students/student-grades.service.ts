import { Injectable, Logger } from '@nestjs/common';
import * as Papa from 'papaparse';

import { StudentGrades } from './entities';
import { StudentsService } from './students.service';

import { StudentGrade } from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class StudentGradesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly studentsService: StudentsService,
  ) {}

  async importStudents(csvData: string): Promise<void> {
    const studentsData = this.parseCsvData(csvData);
    const existingEmails = await this.usersService.getAllEmails();
    await this.processStudents(studentsData, existingEmails);
  }

  private parseCsvData(csvData: string): StudentGrade[] {
    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    return parsedData.data
      .filter((row: Partial<StudentGrade>) => row.email !== '')
      .map((row: Partial<StudentGrade>) => ({
        ...row,
        courseCompletion: Number(row.courseCompletion),
        courseEngagement: Number(row.courseEngagement),
        projectDegree: Number(row.projectDegree),
        teamProjectDegree: Number(row.teamProjectDegree),
      })) as StudentGrade[];
  }

  private async processStudents(
    studentsData: StudentGrade[],
    existingEmails: string[],
  ): Promise<void> {
    const studentPromises = studentsData.map(async student => {
      if (!this.isValidEmail(student.email)) {
        Logger.log(`Niepoprawny email: ${student.email}`);
      } else if (this.emailExistsInDatabase(student.email, existingEmails)) {
        Logger.log(`Email ${student.email} znajduje się już w bazie danych`);
      } else {
        await this.addStudent(student);
      }
    });

    await Promise.all(studentPromises);
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@');
  }

  private emailExistsInDatabase(email: string, existingEmails: string[]): boolean {
    return existingEmails.includes(email);
  }

  private async addStudent(studentData: StudentGrade): Promise<void> {
    Logger.log(`Dodano studenta ${studentData.email}`);
    const student = await this.studentsService.createStudent(studentData.email);
    student.grades = await this.addStudentGrade(studentData);
    await student.save();
  }

  addStudentGrade(studentData: StudentGrade): Promise<StudentGrades> {
    const studentGrade = new StudentGrades();
    studentGrade.courseCompletion = studentData.courseCompletion;
    studentGrade.courseEngagement = studentData.courseEngagement;
    studentGrade.projectDegree = studentData.projectDegree;
    studentGrade.teamProjectDegree = studentData.teamProjectDegree;
    studentGrade.bonusProjectUrls = studentData.bonusProjectUrls.split(',');
    return studentGrade.save();
  }
}
