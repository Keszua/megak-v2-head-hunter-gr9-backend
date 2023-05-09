export enum MailSubject {
  REGISTER = 'Link do rejestracji',
  RESTORE_PWD = 'Odzyskiwanie hasła',
}

export enum MailTemplate {
  REGISTER = 'register',
  RESTORE_PWD = 'restore-pwd',
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
