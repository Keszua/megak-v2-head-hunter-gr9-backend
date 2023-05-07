import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { join } from 'path';

const templatePath = join(__dirname, '..', 'email', 'templates');
// eslint-disable-next-line max-lines-per-function
export const getMailerConfig = (configService: ConfigService): MailerOptions => ({
  transport: {
    host: configService.get('MAIL_HOST'),
    port: configService.get('MAIL_PORT'),
    ignoreTLS: true,
    secure: false,
    auth:
      configService.get('MAIL_INCOMING_USER') && configService.get('MAIL_INCOMING_PASS')
        ? {
            user: configService.get('MAIL_INCOMING_USER'),
            pass: configService.get('MAIL_INCOMING_PASS'),
          }
        : null,
  },
  defaults: {
    from: `Head Hunter - Admin <admin@${configService.get('MAIL_DOMAIN')}>}`,
  },
  options: {
    partials: {
      dir: join(templatePath, 'partials'),
      options: {
        strict: true,
      },
    },
  },
  preview: false,
  template: {
    dir: join(templatePath, 'emails'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
