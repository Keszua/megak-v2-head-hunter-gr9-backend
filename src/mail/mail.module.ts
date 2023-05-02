// eslint-disable-next-line max-classes-per-file
import { Module } from '@nestjs/common';
import { TokensModule } from 'src/tokens/tokens.module';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [TokensModule],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
