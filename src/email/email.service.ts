import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { Student } from '../students/entities';
import { LinksService } from '../tokens/links.service';
import { SendEmailOptions, StudentWithActivationLink } from '../types';
import { User } from '../users/entities/user.entity';
import { MailSubject, MailTemplate } from '../utils';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly linksService: LinksService,
  ) {}

  public async sendEmail(options: SendEmailOptions): Promise<void> {
    const { email, template, subject, context, from } = options;
    try {
      await this.mailerService.sendMail({
        to: email,
        from: from ? from : `Head Hunter - Admin <admin@${this.configService.get('MAIL_DOMAIN')}>`,
        subject: `Head Hunter - ${subject}`,
        template,
        context,
      });
      Logger.log(`Email sent to ${email} with subject "${subject}"`, EmailService.name);
    } catch (error) {
      Logger.error(
        `Failed to send email to ${email} with subject "${subject}"`,
        error.stack,
        EmailService.name,
      );
      throw error;
    }
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

  async sendRegistrationConfirmationToStudents(
    studentsWithActivationsLinks: StudentWithActivationLink[],
  ): Promise<void> {
    const promises = studentsWithActivationsLinks.map(async student => {
      await this.sendEmail({
        email: student.email,
        subject: MailSubject.REGISTER,
        template: MailTemplate.REGISTER,
        context: {
          url: student.activationLink,
        },
      });
    });
    await Promise.all(promises);
  }

  async createActivationLinksAndSendToStudents(students: Student[]): Promise<void> {
    const studentsWithActivationLinks = await this.linksService.createActivationLinksForStudents(
      students,
    );
    await this.sendRegistrationConfirmationToStudents(studentsWithActivationLinks);
  }

  async createActivationLinkAndSendToUser(user: User): Promise<void> {
    const activationLink = await this.linksService.createActivationLink(user);
    await this.sendRegistrationConfirmation(user, activationLink);
  }
}
