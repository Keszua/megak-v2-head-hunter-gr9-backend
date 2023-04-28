import { Injectable, Logger } from '@nestjs/common';
import * as Papa from 'papaparse';

import { StudentGrades } from './entities';
import { mapProcessedStudentsResponse } from './response.mappers';
import { StudentsService } from './students.service';

import { ImportErrors, ImportResultResponse, ProcessedStudents, StudentGrade } from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class StudentGradesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly studentsService: StudentsService,
  ) {}

  async importStudents(csvData: string): Promise<ImportResultResponse> {
    const studentsData = this.parseCsvData(csvData);
    const existingEmails = await this.usersService.getAllEmails();
    return this.processStudents(studentsData, existingEmails);
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
  ): Promise<ImportResultResponse> {
    const errors: ImportErrors = {
      csvDuplicates: { count: 0, details: [] },
      databaseDuplicates: { count: 0, details: [] },
      invalidEmails: { count: 0, details: [] },
    };
    const uniqueStudentsData = this.removeDuplicateRecords(studentsData, errors);
    const { addedEmails, errors: studentErrors } = await this.processUniqueStudents(
      uniqueStudentsData,
      existingEmails,
      errors,
    );
    return mapProcessedStudentsResponse(addedEmails, studentErrors);
  }

  private async processUniqueStudents(
    uniqueStudentsData: StudentGrade[],
    existingEmails: string[],
    errors: ImportErrors,
  ): Promise<ProcessedStudents> {
    const addedEmails: string[] = [];
    const studentPromises = uniqueStudentsData.map(async student => {
      if (!this.isValidEmail(student.email)) {
        errors.invalidEmails.details.push(student.email);
        Logger.warn(`Niepoprawny email: ${student.email}`);
      } else if (this.emailExistsInDatabase(student.email, existingEmails)) {
        errors.databaseDuplicates.details.push(student.email);
        Logger.warn(`Email ${student.email} znajduje się już w bazie danych`);
      } else {
        await this.addStudent(student);
        addedEmails.push(student.email);
      }
    });
    await Promise.all(studentPromises);
    return { addedEmails, errors };
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@');
  }

  private emailExistsInDatabase(email: string, existingEmails: string[]): boolean {
    return existingEmails.includes(email);
  }

  private removeDuplicateRecords(
    studentsData: StudentGrade[],
    errors: ImportErrors,
  ): StudentGrade[] {
    const emailsSet = new Set<string>();
    const uniqueStudentsData: StudentGrade[] = [];

    studentsData.forEach(student => {
      if (!emailsSet.has(student.email)) {
        emailsSet.add(student.email);
        uniqueStudentsData.push(student);
      } else {
        errors.csvDuplicates.details.push(student.email);
        Logger.warn(`Znaleziono duplikat emaila w pliku CSV: ${student.email}`);
      }
    });
    return uniqueStudentsData;
  }

  private async addStudent(studentData: StudentGrade): Promise<void> {
    const student = await this.studentsService.createStudent(studentData.email);
    student.grades = await this.addStudentGrade(studentData);
    await student.save();
    Logger.log(`Dodano studenta ${studentData.email}`);
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
