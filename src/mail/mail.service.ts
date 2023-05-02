import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/users/entities/user.entity';
import { MailSubject, MailTemplate } from 'src/utils/mail/mail-details';

import { TokenData, TokenOptions } from '../types/token/token';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly tokensService: TokensService,
  ) {}

  async sendRegisterConfirmation(user: User): Promise<void> {
    const tokenType: TokenOptions = { tokenType: 'activation' };
    const url = await this.createUrl(user, tokenType);
    await this.sendMail(url, MailSubject.REGISTER, MailTemplate.REGISTER);
  }

  async resetPassword(user: User): Promise<void> {
    const tokenType: TokenOptions = { tokenType: 'password-reset' };
    const url = await this.createUrl(user, tokenType);
    await this.sendMail(url, MailSubject.RESTORE_PWD, MailTemplate.RESTORE_PWD);
  }

  private async createUrl(user: User, tokenType: TokenOptions): Promise<string> {
    const tokenData: TokenData = await this.tokensService.createToken(user, tokenType);
    const { token } = tokenData;
    return `http://localhost:3001/api/auth/register/${user.id}/${token}`;
  }

  private async sendMail(url: string, subject: MailSubject, template: MailTemplate): Promise<void> {
    await this.mailerService.sendMail({
      to: 'root@localhost.com',
      from: process.env.DEFAULT_FROM,
      subject: `${subject}`,
      template: `${__dirname}/templates/email/${template}`,
      context: {
        url,
        subject,
      },
    });
  }
}
