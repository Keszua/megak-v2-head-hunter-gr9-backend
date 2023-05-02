import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtRefreshGuard, LocalAuthGuard } from './guards';

import { CurrentUser, Public } from '../common';
import { UserResponse } from '../types';
import { User } from '../users/entities/user.entity';
import {
  createResponseSchema,
  errorCodeDataSchema,
  errorResponseSchema,
  unauthorizedExample,
  userResponseExample,
  userResponseSchema,
} from '../utils';

@ApiTags('auth')
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred while processing the request.',
  schema: errorResponseSchema({
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    exampleData: { message: 'Internal server error' },
  }),
})
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registers a user and activates the account' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({
    description: 'User registered and account activated',
    schema: createResponseSchema({ statusCode: HttpStatus.OK }),
  })
  @ApiBadRequestResponse({
    description: 'User already registered',
    schema: errorResponseSchema({
      statusCode: HttpStatus.BAD_REQUEST,
      exampleData: { message: 'User already registered' },
    }),
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Patch('register')
  register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Logs in a user and returns tokens in cookies' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'User logged in and tokens in cookies',
    schema: createResponseSchema({
      statusCode: HttpStatus.OK,
      dataSchema: userResponseSchema,
      exampleData: userResponseExample,
    }),
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid login credentials',
    schema: errorResponseSchema({
      dataSchema: errorCodeDataSchema,
      statusCode: HttpStatus.UNAUTHORIZED,
      exampleData: unauthorizedExample,
    }),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserResponse> {
    return this.authService.login(user, res);
  }

  @ApiOperation({ summary: 'Refreshes tokens and returns them in cookies' })
  @ApiOkResponse({
    description: 'Tokens refreshed and returned in cookies',
    schema: createResponseSchema({
      statusCode: HttpStatus.OK,
      dataSchema: userResponseSchema,
      exampleData: userResponseExample,
    }),
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid refresh token',
    schema: errorResponseSchema({
      dataSchema: errorCodeDataSchema,
      statusCode: HttpStatus.UNAUTHORIZED,
      exampleData: unauthorizedExample,
    }),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Public()
  @Get('refresh')
  refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserResponse> {
    return this.authService.getNewAuthenticatedTokensByRefreshToken(user, res);
  }

  @ApiOperation({ summary: 'Logs out a user and removes authentication tokens' })
  @ApiOkResponse({
    description: 'User logged out',
    schema: createResponseSchema({ statusCode: HttpStatus.OK }),
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid authentication token',
    schema: errorResponseSchema({
      dataSchema: errorCodeDataSchema,
      statusCode: HttpStatus.UNAUTHORIZED,
      exampleData: unauthorizedExample,
    }),
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authService.logout(user, res);
  }
}
