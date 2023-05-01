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
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { JwtRefreshGuard, LocalAuthGuard } from './guards';

import { CurrentUser, Public } from '../common';
import { UserResponse } from '../types';
import { User } from '../users/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Rejestruje użytkownika i aktywuje konto' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ description: 'Użytkownik zarejestrowany i konto aktywowane' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Patch('register')
  register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Loguje użytkownika i zwraca tokeny w cookies' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Użytkownik zalogowany i tokeny w cookies' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Nieprawidłowe dane logowania' })
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

  @ApiOperation({ summary: 'Odświeża tokeny i zwraca je w cookies' })
  @ApiOkResponse({ description: 'Tokeny odświeżone i zwrócone w cookies' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Nieprawidłowy token odświeżania' })
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
}
