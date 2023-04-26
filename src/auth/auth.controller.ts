import { Body, Controller, HttpCode, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LocalAuthGuard } from './guards';

import { UserResponse } from '../types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Rejestruje użytkownika i aktywuje konto' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ description: 'Użytkownik zarejestrowany i konto aktywowane' })
  @HttpCode(200)
  @Patch('register')
  register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response): UserResponse {
    return this.authService.login(req.user as UserResponse, res);
  }
}
