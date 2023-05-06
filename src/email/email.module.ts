import { Module } from '@nestjs/common';
import { LinksService } from 'src/tokens/links.service';
import { TokensModule } from 'src/tokens/tokens.module';

import { MailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [TokensModule],
  controllers: [MailController],
  providers: [EmailService, LinksService],
  exports: [EmailModule],
})
export class EmailModule {}
