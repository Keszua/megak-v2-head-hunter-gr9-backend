import { Module } from '@nestjs/common';

import { EmailService } from './email.service';

import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [TokensModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
