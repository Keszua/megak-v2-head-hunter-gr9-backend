import { Injectable } from '@nestjs/common';
import { HrCreatedResponse } from 'src/types';

import { CreateHrDto } from './dto/create-hr.dto';
import { Hr } from './entities/hr.entity';

@Injectable()
export class HrService {
  async createHr(hrData: CreateHrDto): Promise<HrCreatedResponse> {
    const { fullName, company } = hrData;
    const hr = new Hr();
    hr.fullName = fullName;
    hr.company = company;
    await hr.save();
    return {
      id: hr.id,
      ...hrData,
    };
  }
}
