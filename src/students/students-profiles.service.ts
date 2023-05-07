import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { CreateStudentProfileDto } from './dto';
import { Student, StudentProfile } from './entities';
import { mapStudentProfileResponse } from './mappers.response';
import { StudentsService } from './students.service';

import { StudentResponse } from '../types';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StudentsProfilesService {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly httpService: HttpService,
  ) {}
  async createAndValidateStudentProfile(
    studentProfileData: CreateStudentProfileDto,
    user: User,
  ): Promise<StudentResponse> {
    await this.checkGithubUsernameExists(studentProfileData.githubUsername);

    const student = await this.studentsService.getStudentById(user.id);
    const studentProfile = await this.createStudentProfile(studentProfileData, student);

    return mapStudentProfileResponse(studentProfile);
  }

  async checkGithubUsernameExists(githubUsername: string): Promise<boolean> {
    try {
      await firstValueFrom(this.httpService.get(`https://api.github.com/users/${githubUsername}`));
      return true;
    } catch (error) {
      Logger.error('Github username does not exist', StudentProfile.name);
      throw new BadRequestException('Github username does not exists');
    }
  }

  private createStudentProfile(
    studentProfileData: CreateStudentProfileDto,
    student: Student,
  ): Promise<StudentProfile> {
    const studentProfile = new StudentProfile();
    studentProfile.firstName = studentProfileData.firstName;
    studentProfile.lastName = studentProfileData.lastName;
    studentProfile.githubUsername = studentProfileData.githubUsername;
    studentProfile.tel = studentProfileData.tel;
    studentProfile.bio = studentProfileData.bio;
    studentProfile.targetWorkCity = studentProfileData.targetWorkCity;
    studentProfile.expectedSalary = studentProfileData.expectedSalary;
    studentProfile.expectedTypeWork = studentProfileData.expectedTypeWork;
    studentProfile.expectedContractType = studentProfileData.expectedContractType;
    studentProfile.canTakeApprenticeship = studentProfileData.canTakeApprenticeship;
    studentProfile.monthsOfCommercialExp = studentProfileData.monthsOfCommercialExp;
    studentProfile.education = studentProfileData.education;
    studentProfile.workExperience = studentProfileData.workExperience;
    studentProfile.courses = studentProfileData.courses;
    studentProfile.projectUrls = studentProfileData.projectUrls;
    studentProfile.portfolioUrls = studentProfileData.portfolioUrls;
    studentProfile.student = student;
    return studentProfile.save();
  }
}
