import { Injectable, Logger } from '@nestjs/common';
import * as Papa from 'papaparse';
import { EmailEmitter } from 'src/orders';

import { StudentGrades } from './entities';
import { mapProcessedStudentsResponse } from './mappers.response';
import { StudentsService } from './students.service';

import {
  ImportErrors,
  ImportResultResponse,
  ProcessedStudents,
  StudentGradesRequest,
} from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class StudentGradesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly studentsService: StudentsService,
    private readonly emailEmitter: EmailEmitter,
  ) {}

  async importStudents(csvData: string): Promise<ImportResultResponse> {
    const studentsData = this.parseCsvData(csvData);
    const existingEmails = await this.usersService.getAllEmails();
    return this.processStudents(studentsData, existingEmails);
  }

  private parseCsvData(csvData: string): StudentGradesRequest[] {
    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    return parsedData.data
      .filter((row: Partial<StudentGradesRequest>) => row.email !== '')
      .map((row: Partial<StudentGradesRequest>) => ({
        ...row,
        courseCompletion: Number(row.courseCompletion),
        courseEngagement: Number(row.courseEngagement),
        projectDegree: Number(row.projectDegree),
        teamProjectDegree: Number(row.teamProjectDegree),
        bonusProjectUrls: row.bonusProjectUrls || [],
      })) as StudentGradesRequest[];
  }

  private async processStudents(
    studentsData: StudentGradesRequest[],
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
    await this.emailEmitter.emitRegistrationEmailSendEvent({ email: addedEmails });
    return mapProcessedStudentsResponse(addedEmails, studentErrors);
  }

  private async processUniqueStudents(
    uniqueStudentsData: StudentGradesRequest[],
    existingEmails: string[],
    errors: ImportErrors,
  ): Promise<ProcessedStudents> {
    const addedEmails: string[] = [];
    const studentPromises = uniqueStudentsData.map(async student => {
      if (!this.isValidEmail(student.email)) {
        errors.invalidEmails.details.push(student.email);
        Logger.warn(`Invalid email: ${student.email}`, StudentGradesService.name);
      } else if (this.emailExistsInDatabase(student.email, existingEmails)) {
        errors.databaseDuplicates.details.push(student.email);
        Logger.warn(
          `Email ${student.email} already exists in the database`,
          StudentGradesService.name,
        );
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
    studentsData: StudentGradesRequest[],
    errors: ImportErrors,
  ): StudentGradesRequest[] {
    const emailsSet = new Set<string>();
    const uniqueStudentsData: StudentGradesRequest[] = [];

    studentsData.forEach(student => {
      if (!emailsSet.has(student.email)) {
        emailsSet.add(student.email);
        uniqueStudentsData.push(student);
      } else {
        errors.csvDuplicates.details.push(student.email);
        Logger.warn(`CSV duplicate email found: ${student.email}`, StudentGradesService.name);
      }
    });
    return uniqueStudentsData;
  }

  private async addStudent(studentData: StudentGradesRequest): Promise<void> {
    const student = await this.studentsService.createStudent(studentData.email);
    student.grades = await this.addStudentGrade(studentData);
    await student.save();
    Logger.log(`Added student ${studentData.email}`, StudentGradesService.name);
  }

  addStudentGrade(studentData: StudentGradesRequest): Promise<StudentGrades> {
    const studentGrade = new StudentGrades();
    studentGrade.courseCompletion = studentData.courseCompletion;
    studentGrade.courseEngagement = studentData.courseEngagement;
    studentGrade.projectDegree = studentData.projectDegree;
    studentGrade.teamProjectDegree = studentData.teamProjectDegree;
    studentGrade.bonusProjectUrls = studentData.bonusProjectUrls;
    return studentGrade.save();
  }
}
