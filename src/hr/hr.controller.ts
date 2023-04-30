import { Controller, Body, HttpStatus, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { HrCreatedResponse } from 'src/types';

import { CreateHrDto } from './dto';
import { HrService } from './hr.service';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @ApiOperation({ summary: 'Tworzy Hr i dodaje do bazy danych.' })
  @ApiBody({ type: CreateHrDto })
  @ApiOkResponse({ description: 'Hr został dodany do bazy danych.' })
  @HttpCode(HttpStatus.OK)
  @Post('/')
  createHr(@Body() hrData: CreateHrDto): Promise<HrCreatedResponse> {
    return this.hrService.createHr(hrData);
  }
}
