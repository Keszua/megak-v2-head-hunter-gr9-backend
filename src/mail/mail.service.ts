import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { TokensService } from 'src/tokens/tokens.service';
import { User } from 'src/users/entities/user.entity';

import { TokenData, TokenOptions } from '../types/token/token';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly tokensService: TokensService,
  ) {}

  async sendRegisterConfirmation(user: User): Promise<void> {
    const tokenType: TokenOptions = { tokenType: 'activation' };
    const tokenData: TokenData = await this.tokensService.createToken(user, tokenType);
    const { token } = tokenData;
    const url = `http://localhost:3001/api/auth/register/${user.id}/${token}`;

    await this.mailerService
      .sendMail({
        to: 'root@localhost.com',
        from: process.env.DEFAULT_FROM,
        subject: 'Registration link ✔',
        template: `${__dirname}/templates/email/test`,
        context: {
          url,
        },
      })
      .catch(error => Logger.error(error));
  }
}
