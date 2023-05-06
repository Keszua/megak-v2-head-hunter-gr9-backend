import { Controller, Body, HttpStatus, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HrCreatedResponse } from 'src/types';

import { CreateHrDto } from './dto';
import { HrService } from './hr.service';
import { hrBadRequestResponse, hrCreatedResponse } from './hr.swagger.response';

import { CommonApiUnauthorizedResponse, CommonApiInternalServerErrorResponse } from '../utils';

@ApiTags('Human Resources')
@CommonApiUnauthorizedResponse()
@CommonApiInternalServerErrorResponse()
@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @ApiOperation({ summary: 'Create an HR record and add it to the database.' })
  @ApiBody({ type: CreateHrDto })
  @ApiCreatedResponse(hrCreatedResponse)
  @ApiBadRequestResponse(hrBadRequestResponse)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  createHr(@Body() hrData: CreateHrDto): Promise<HrCreatedResponse> {
    return this.hrService.createHr(hrData);
  }
}
