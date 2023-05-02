import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  transport: {
<<<<<<< HEAD
    host: `localhost`,
    port: 1025,
=======
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
>>>>>>> 4dab83a3ddf0d87f3c9f5fc30c3abb40c8cc9239
    ignoreTLS: true,
    secure: false,
    auth: {
      user: process.env.MAILDEV_INCOMING_USER,
      pass: process.env.MAILDEV_INCOMING_PASS,
    },
  },
  defaults: {
<<<<<<< HEAD
    from: 'admin@test.example.com',
  },
  preview: true,
  template: {
    dir: `${process.cwd()}/src/templates/email`,
=======
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
>>>>>>> 4dab83a3ddf0d87f3c9f5fc30c3abb40c8cc9239
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};
