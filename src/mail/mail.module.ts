// eslint-disable-next-line max-classes-per-file
import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from 'nest-bull';

import * as path from 'path';

import { MailController } from './mail.controller';
import { MailQueue } from './mail.queue';
import { MailService } from './mail.service';

import { mailBullConfig } from '../../config/mail';

const bullModule = BullModule.forRoot(mailBullConfig);
@Module({
  imports: [
    bullModule,
    MailerModule.forRoot({
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: path.join(process.env.PWD, 'templates/pages'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: path.join(process.env.PWD, 'templates/partials'),
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService, MailQueue],
  exports: [bullModule],
})
export class MailModule { }
export class MailModule { }
=======
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
>>>>>>> 4dab83a3ddf0d87f3c9f5fc30c3abb40c8cc9239
