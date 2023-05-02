import { Controller, Body, HttpStatus, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HrCreatedResponse } from 'src/types';

import { CreateHrDto } from './dto';
import { HrService } from './hr.service';

import {
  unauthorizedExample,
  errorResponseSchema,
  errorCodeDataSchema,
  createResponseSchema,
  hrCreatedResponseExample,
  hrCreatedResponseSchema,
} from '../utils';

@ApiTags('Human Resources')
@ApiUnauthorizedResponse({
  description: 'Unauthorized access',
  schema: errorResponseSchema({
    statusCode: HttpStatus.UNAUTHORIZED,
    exampleData: unauthorizedExample,
    dataSchema: errorCodeDataSchema,
  }),
})
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred while processing the request.',
  schema: errorResponseSchema({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    exampleData: { message: 'Internal server error' },
  }),
})
@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @ApiOperation({ summary: 'Create an HR record and add it to the database.' })
  @ApiBody({ type: CreateHrDto })
  @ApiCreatedResponse({
    description: 'The HR record has been added to the database.',
    schema: createResponseSchema({
      statusCode: HttpStatus.CREATED,
      dataSchema: hrCreatedResponseSchema,
      exampleData: hrCreatedResponseExample,
    }),
  })
  @ApiBadRequestResponse({
    description: 'The HR record could not be created.',
    schema: errorResponseSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      exampleData: {
        example1: { message: 'User with this email already exists.' },
        example2: { message: 'Validation failed. Please check your input and try again.' },
      },
    }),
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  createHr(@Body() hrData: CreateHrDto): Promise<HrCreatedResponse> {
    return this.hrService.createHr(hrData);
  }
}
