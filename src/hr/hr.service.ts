import { Injectable } from '@nestjs/common';
import { HrCreatedResponse, UserRole } from 'src/types';
import { UsersService } from 'src/users/users.service';

import { CreateHrDto } from './dto';
import { Hr } from './entities/hr.entity';

@Injectable()
export class HrService {
  constructor(private readonly usersService: UsersService) {}

  async createHr(hrData: CreateHrDto): Promise<HrCreatedResponse> {
    const { email, fullName, company } = hrData;
    const user = await this.usersService.createUser({
      email,
      role: UserRole.HR,
    });
    const hr = new Hr();
    hr.fullName = fullName;
    hr.company = company;
    hr.user = user;
    return hr.save();
  }
}
