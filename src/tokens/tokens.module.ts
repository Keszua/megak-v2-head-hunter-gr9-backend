import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivationToken, PasswordResetToken, RefreshToken } from './entities';
import { LinksService } from './links.service';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivationToken, PasswordResetToken, RefreshToken]),
    JwtModule.register({}),
  ],
  providers: [TokensService, LinksService],
  exports: [TokensService, LinksService],
})
export class TokensModule {}
