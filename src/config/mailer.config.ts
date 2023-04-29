import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  transport: {
    host: `localhost`,
    port: 1025,
    ignoreTLS: true,
    secure: false,
    auth: {
      user: process.env.MAILDEV_INCOMING_USER,
      pass: process.env.MAILDEV_INCOMING_PASS,
    },
  },
  defaults: {
    from: 'admin@test.example.com',
  },
  preview: true,
  template: {
    dir: `${process.cwd()}/src/templates/email`,
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
