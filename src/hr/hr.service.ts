import { Injectable } from '@nestjs/common';
import { HrCreatedResponse, UserRole } from 'src/types';
import { UsersService } from 'src/users/users.service';

import { CreateHrDto } from './dto';
import { Hr } from './entities/hr.entity';
import { mapHrCreatedResponse } from './mappers.response';

import { EmailService } from '../email/email.service';
import { LinksService } from '../tokens/links.service';

@Injectable()
export class HrService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly linksService: LinksService,
  ) {}

  async createHr(hrData: CreateHrDto): Promise<HrCreatedResponse> {
    const { email, fullName, company, maxReservedStudents } = hrData;
    const user = await this.usersService.createUser({
      email,
      role: UserRole.HR,
    });
    const hr = new Hr();
    hr.fullName = fullName;
    hr.company = company;
    hr.maxReservedStudents = maxReservedStudents;
    hr.user = user;
    const newHr = await hr.save();
    const activationLink = await this.linksService.createActivationLink(user);
    await this.emailService.sendRegistrationConfirmation(user, activationLink);
    return mapHrCreatedResponse(newHr);
  }
}
