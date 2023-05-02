<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public example(): void {
    this.mailerService
      .sendMail({
        to: 'test@nestjs.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: `${__dirname} welcome`, // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then(() => {})
      .catch(() => {});
=======
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
>>>>>>> 4dab83a3ddf0d87f3c9f5fc30c3abb40c8cc9239
  }
}
