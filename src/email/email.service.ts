import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { TokensService } from 'src/tokens/tokens.service';
import { RegistrationLinks } from 'src/types';
import { User } from 'src/users/entities/user.entity';
import { MailSubject, MailTemplate } from 'src/utils/mail/mail-details';

import { TokenData, TokenOptions } from '../types/token/token';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly tokensService: TokensService,
  ) {}

  private async createUrls(users: User[], tokenType: TokenOptions): Promise<RegistrationLinks[]> {
    const registrationLinks: RegistrationLinks[] = [];
    const promises = users.map(async user => {
      const tokenData: TokenData = await this.tokensService.createToken(user, tokenType);
      const { token } = tokenData;
      const url = `http://localhost:3000/api/auth/register/${user.id}/${token}`;
      registrationLinks.push({
        email: user.email,
        url,
      });
    });
    await Promise.all(promises);
    Logger.log('users', users, 'tokenType', tokenType);
    return registrationLinks;
  }

  async sendRegisterConfirmation(email: string[], configService?: ConfigService): Promise<void> {
    const users = (await User.find()).filter(user => email.some(e => e === user.email));
    const tokenType: TokenOptions = { tokenType: 'activation' };
    const urls = await this.createUrls(users, tokenType);

    Logger.log('urls:', urls);

    urls.forEach(async obj => {
      await this.mailerService.sendMail({
        to: obj.email,
        from: configService.get('MAIL_DEFAULT_FROM'),
        subject: MailSubject.REGISTER,
        template: `${__dirname}/templates/email/${MailTemplate.REGISTER}`,
        context: {
          url: obj.url,
          subject: MailSubject.REGISTER,
        },
      });
    });
  }
}
