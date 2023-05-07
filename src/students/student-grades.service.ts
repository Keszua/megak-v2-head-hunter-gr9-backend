import { Injectable, Logger } from '@nestjs/common';
import * as Papa from 'papaparse';

import { Student, StudentGrades } from './entities';
import { mapProcessedStudentsResponse } from './mappers.response';
import { StudentsService } from './students.service';

import { EmailService } from '../email/email.service';
import { LinksService } from '../tokens/links.service';
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
    private readonly linksService: LinksService,
    private readonly emailService: EmailService,
  ) {}

  async importStudents(csvData: string): Promise<ImportResultResponse> {
    const studentsData = this.parseCsvData(csvData);
    const existingEmails = await this.usersService.getAllEmails();
    const { addedStudents, errors } = await this.processStudents(studentsData, existingEmails);

    const studentsWithActivationLinks = await this.linksService.createActivationLinksForStudents(
      addedStudents,
    );
    await this.emailService.sendRegistrationConfirmationToStudents(studentsWithActivationLinks);

    const emails = this.studentsService.getEmailsFromAddedStudents(addedStudents);
    return mapProcessedStudentsResponse(emails, errors);
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
  ): Promise<ProcessedStudents> {
    const errors: ImportErrors = {
      csvDuplicates: { count: 0, details: [] },
      databaseDuplicates: { count: 0, details: [] },
      invalidEmails: { count: 0, details: [] },
    };
    const uniqueStudentsData = this.removeDuplicateRecords(studentsData, errors);
    const { addedStudents, errors: studentErrors } = await this.processUniqueStudents(
      uniqueStudentsData,
      existingEmails,
      errors,
    );
    return { addedStudents, errors: studentErrors };
  }

  private async processUniqueStudents(
    uniqueStudentsData: StudentGradesRequest[],
    existingEmails: string[],
    errors: ImportErrors,
  ): Promise<ProcessedStudents> {
    const addedStudents: Student[] = [];
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
        const addedStudent = await this.addStudent(student);
        addedStudents.push(addedStudent);
      }
    });
    await Promise.all(studentPromises);
    return { addedStudents, errors };
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

  private async addStudent(studentData: StudentGradesRequest): Promise<Student> {
    const student = await this.studentsService.createStudent(studentData.email);
    student.grades = await this.addStudentGrade(studentData);
    Logger.log(`Added student ${studentData.email}`, StudentGradesService.name);
    return student.save();
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
