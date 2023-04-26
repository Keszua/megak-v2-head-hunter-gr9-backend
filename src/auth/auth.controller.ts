import { Body, Controller, HttpCode, Patch } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto';

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
}
