import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { SendEmailOptions } from '../types';
import { User } from '../users/entities/user.entity';
import { MailSubject, MailTemplate } from '../utils';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendEmail(options: SendEmailOptions): Promise<void> {
    const { email, template, subject, context, from } = options;

    await this.mailerService.sendMail({
      to: email,
      from: from ? from : `Head Hunter - Admin <admin@${this.configService.get('MAIL_DOMAIN')}>`,
      subject: `Head Hunter - ${subject}`,
      template,
      context,
    });
  }

  async sendRegistrationConfirmation(user: User, activationLink: string): Promise<void> {
    await this.sendEmail({
      email: user.email,
      subject: MailSubject.REGISTER,
      template: MailTemplate.REGISTER,
      context: {
        url: activationLink,
      },
    });
  }
}
