import { Controller, Body, HttpStatus, HttpCode, Patch } from '@nestjs/common';
import { HrCreateRequest, HrCreatedResponse } from 'src/types';

import { HrService } from './hr.service';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @HttpCode(HttpStatus.OK)
  @Patch('/')
  createHr(@Body() hrData: HrCreateRequest): Promise<HrCreatedResponse> {
    return this.hrService.createHr(hrData);
  }
}
