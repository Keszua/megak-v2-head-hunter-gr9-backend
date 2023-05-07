import { MailSubject, MailTemplate } from '../../utils';

export interface RegistrationLinks {
  email: string;
  url: string;
}

export interface SendEmailOptions {
  email: string;
  template: MailTemplate;
  subject: MailSubject;
  context: {
    [name: string]: unknown;
  };
  from?: string;
}
