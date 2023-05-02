import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  transport: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    ignoreTLS: true,
    secure: false,
    auth: {
      user: process.env.MAILDEV_INCOMING_USER,
      pass: process.env.MAILDEV_INCOMING_PASS,
    },
  },
  defaults: {
    from: process.env.DEFAULT_FROM,
  },
  options: {
    partials: {
      dir: `${process.cwd()}/templates/partials`,
      options: {
        strict: true,
      },
    },
  },
  preview: false,
  template: {
    dir: `${process.cwd()}/templates/email`,
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
