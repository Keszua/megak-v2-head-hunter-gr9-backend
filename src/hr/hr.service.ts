import { Injectable } from '@nestjs/common';
import { HrCreatedResponse, UserRole } from 'src/types';
import { UsersService } from 'src/users/users.service';

import { CreateHrDto } from './dto';
import { Hr } from './entities/hr.entity';
import { mapHrCreatedResponse } from './mappers.response';

import { EmailEmitter } from '../events/emitters';

@Injectable()
export class HrService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailEmitter: EmailEmitter,
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
    await this.emailEmitter.emitRegistrationEmailSendEvent({ user });
    return mapHrCreatedResponse(newHr);
  }
}
