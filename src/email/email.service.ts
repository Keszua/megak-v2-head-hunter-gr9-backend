import { Injectable } from '@nestjs/common';
import { LinksService } from 'src/tokens/links.service';
import { MailSubject, MailTemplate } from 'src/utils';

@Injectable()
export class EmailService {
  constructor(private readonly linksService: LinksService) {}

  public async sendEmail(
    email: string,
    link: string,
    template: MailTemplate,
    subject: MailSubject,
  ): Promise<void> {
    await this.linksService.sendEmail(email, link, template, subject);
  }

  public async sendRegisterConfirmation(email: string[]): Promise<void> {
    const urls = await this.linksService.createRegisterUrls(email);
    await this.linksService.sendRegisterConfirmation(urls);
  }
}
