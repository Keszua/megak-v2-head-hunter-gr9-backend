import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import path from 'path';

// eslint-disable-next-line max-lines-per-function
export const getMailerConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.get('MAIL_HOST'),
    port: configService.get('MAIL_PORT'),
    ignoreTLS: true,
    secure: false,
    auth: {
      user: configService.get('MAILDEV_INCOMING_USER'),
      pass: configService.get('MAILDEV_INCOMING_PASS'),
    },
  },
  defaults: {
    from: configService.get('DEFAULT_FROM'),
  },
  options: {
    partials: {
      dir: path.join(__dirname, 'templates/partials'),
      options: {
        strict: true,
      },
    },
  },
  preview: false,
  template: {
    dir: path.join(__dirname, 'templates/email'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
