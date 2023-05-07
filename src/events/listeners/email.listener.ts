import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailService } from '../../email/email.service';
import {
  EmailRegistrationLinkEvent,
  EmailRegistrationLinksToStudentsEvent,
  events,
} from '../events';

@Injectable()
export class EmailListener {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent(events.emailSendRegistrationLink, { async: true })
  async handleEmailRegistrationLinkEvent(payload: EmailRegistrationLinkEvent): Promise<void> {
    await this.emailService.createActivationLinkAndSendToUser(payload.user);
  }

  @OnEvent(events.emailSendRegistrationLinksToStudents, { async: true })
  async handleEmailsRegistrationLinkToStudentsEvent(
    payload: EmailRegistrationLinksToStudentsEvent,
  ): Promise<void> {
    await this.emailService.createActivationLinksAndSendToStudents(payload.students);
  }
}
