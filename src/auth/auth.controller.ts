import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }
}
