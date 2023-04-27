import { Injectable } from '@nestjs/common';
import { HrCreateRequest, HrCreatedResponse } from 'src/types';

import { Hr } from './entities/hr.entity';

@Injectable()
export class HrService {
  async createHr(hrData: HrCreateRequest): Promise<HrCreatedResponse> {
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
