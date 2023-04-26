import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { HrCreatedResponse } from 'src/types';

import { CreateHrDto } from './dto/create-hr.dto';
import { HrService } from './hr.service';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/')
  createHr(@Body() hrData: CreateHrDto): Promise<HrCreatedResponse> {
    return this.hrService.createHr(hrData);
  }
}
