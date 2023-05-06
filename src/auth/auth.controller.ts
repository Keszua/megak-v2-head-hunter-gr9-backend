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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import {
  loginOkResponse,
  loginUnauthorizedResponse,
  logoutOkResponse,
  logoutUnauthorizedResponse,
  refreshTokensOkResponse,
  refreshTokensUnauthorizedResponse,
  registerBadRequestResponse,
  registerOkResponse,
} from './auth.swagger.response';
import { LoginDto, RegisterDto } from './dto';
import { JwtRefreshGuard, LocalAuthGuard } from './guards';

import { CurrentUser, Public } from '../common';
import { UserResponse } from '../types';
import { User } from '../users/entities/user.entity';
import { CommonApiInternalServerErrorResponse } from '../utils';

@ApiTags('Authentication')
@CommonApiInternalServerErrorResponse()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registers a user and activates the account' })
  @ApiBody({ type: RegisterDto, description: 'User registration  details: email and password' })
  @ApiOkResponse(registerOkResponse)
  @ApiBadRequestResponse(registerBadRequestResponse)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Public()
  @Patch('register')
  register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Logs in a user and returns tokens in cookies' })
  @ApiBody({ type: LoginDto, description: 'User login credentials: email and password' })
  @ApiOkResponse(loginOkResponse)
  @ApiUnauthorizedResponse(loginUnauthorizedResponse)
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
  @ApiOkResponse(refreshTokensOkResponse)
  @ApiUnauthorizedResponse(refreshTokensUnauthorizedResponse)
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
  @ApiOkResponse(logoutOkResponse)
  @ApiUnauthorizedResponse(logoutUnauthorizedResponse)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authService.logout(user, res);
  }
}
