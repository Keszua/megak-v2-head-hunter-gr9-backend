import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookiesService } from './cookies.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { TokensModule } from '../tokens/tokens.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, PassportModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService, CookiesService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
