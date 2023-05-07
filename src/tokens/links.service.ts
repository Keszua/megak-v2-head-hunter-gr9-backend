import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TokensService } from './tokens.service';

import { TokenData, TokenOptions } from '../types';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LinksService {
  private readonly clientUrl = this.configService.get<string>('CLIENT_URL');
  constructor(
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService,
  ) {}

  private generateTokenLink(token: string, options: TokenOptions): string {
    const { tokenType } = options;
    return `${this.clientUrl}/${tokenType}/${token}`;
  }

  async createActivationLink(user: User): Promise<string> {
    const tokenData: TokenData = await this.tokensService.createToken(user, {
      tokenType: 'activation',
    });
    return this.generateTokenLink(tokenData.token, { tokenType: 'activation' });
  }

  // async createRegisterUrls(email: string[]): Promise<RegistrationLinks[]> {
  //   const users = (await User.find()).filter(user => email.some(e => e === user.email));
  //   const tokenType: TokenOptions = { tokenType: 'activation' };
  //   const registrationLinks: RegistrationLinks[] = [];
  //   const promises = users.map(async user => {
  //     const tokenData: TokenData = await this.tokensService.createToken(user, tokenType);
  //     const { token } = tokenData;
  //     const url = path.join(
  //       this.configService.get('CLIENT_URL'),
  //       'api',
  //       'auth',
  //       'register',
  //       `${user.id}`,
  //       `${token}`,
  //     );
  //     registrationLinks.push({
  //       email: user.email,
  //       url,
  //     });
  //   });
  //   await Promise.all(promises);
  //   Logger.log('users', users, 'tokenType', tokenType);
  //   return registrationLinks;
  // }

  // async sendRegisterConfirmation(urls: RegistrationLinks[]): Promise<void> {
  //   (await urls).forEach(async obj => {
  //     await this.mailerService.sendMail({
  //       to: obj.email,
  //       from: this.configService.get('MAIL_DOMAIN'),
  //       subject: MailSubject.REGISTER,
  //       template: path.join(__dirname, '../', 'email', 'templates', MailTemplate.REGISTER),
  //       context: {
  //         url: obj.url,
  //         subject: MailSubject.REGISTER,
  //       },
  //     });
  //   });
  // }
}
