import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivationToken, PasswordResetToken, RefreshToken } from './entities';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivationToken, PasswordResetToken, RefreshToken])],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}
