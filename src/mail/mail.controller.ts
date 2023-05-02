<<<<<<< HEAD
import { Controller } from '@nestjs/common';

@Controller('mail')
export class MailController {}
=======
import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CurrentUser } from 'src/common';
import { User } from 'src/users/entities/user.entity';

import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async sendRegisterConfirmation(@CurrentUser() user: User): Promise<void> {
    await this.mailService.sendRegisterConfirmation(user);
  }
}
>>>>>>> 4dab83a3ddf0d87f3c9f5fc30c3abb40c8cc9239
