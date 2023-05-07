import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

import { Hr } from './entities/hr.entity';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';

import { EmailModule } from '../email/email.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hr]), UsersModule, EmailModule, TokensModule],
  controllers: [HrController],
  providers: [HrService],
})
export class HrModule {}
