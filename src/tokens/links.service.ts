import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { MailSubject, MailTemplate } from 'src/utils';

import path from 'path';

import { TokensService } from './tokens.service';

import { RegistrationLinks, TokenData, TokenOptions } from '../types';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LinksService {
  constructor(
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async createRegisterUrls(email: string[]): Promise<RegistrationLinks[]> {
    const users = (await User.find()).filter(user => email.some(e => e === user.email));
    const tokenType: TokenOptions = { tokenType: 'activation' };
    const registrationLinks: RegistrationLinks[] = [];
    const promises = users.map(async user => {
      const tokenData: TokenData = await this.tokensService.createToken(user, tokenType);
      const { token } = tokenData;
      const url = path.join(
        this.configService.get('CLIENT_URL'),
        'api',
        'auth',
        'register',
        `${user.id}`,
        `${token}`,
      );
      registrationLinks.push({
        email: user.email,
        url,
      });
    });
    await Promise.all(promises);
    Logger.log('users', users, 'tokenType', tokenType);
    return registrationLinks;
  }

  async sendRegisterConfirmation(urls: RegistrationLinks[]): Promise<void> {
    (await urls).forEach(async obj => {
      await this.mailerService.sendMail({
        to: obj.email,
        from: this.configService.get('MAIL_DEFAULT_FROM'),
        subject: MailSubject.REGISTER,
        template: path.join(__dirname, '../', 'email', 'templates', MailTemplate.REGISTER),
        context: {
          url: obj.url,
          subject: MailSubject.REGISTER,
        },
      });
    });
  }

  async sendEmail(
    email: string,
    url: string,
    template: MailTemplate,
    subject: MailSubject,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get('MAIL_DEFAULT_FROM'),
      subject: MailSubject.REGISTER,
      template: path.join(__dirname, 'templates', 'email', template),
      context: {
        url: url,
        subject: subject,
      },
    });
  }
}
