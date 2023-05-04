// eslint-disable-next-line max-classes-per-file
import { Module } from '@nestjs/common';
import { TokensModule } from 'src/tokens/tokens.module';

import { MailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [TokensModule],
  controllers: [MailController],
  providers: [EmailService],
  exports: [EmailModule],
})
export class EmailModule {}
