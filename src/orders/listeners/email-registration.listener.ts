import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { StudentsService } from 'src/students/students.service';

import { EmailRegistrationLinkEvent, events } from '../events';

@Injectable()
export class EmailRegistrationListener {
  constructor(private readonly studentsService: StudentsService) {}

  @OnEvent(events.emailSendRegistrationLink, { async: true })
  async handleEmailRegistrationEvent(payload: EmailRegistrationLinkEvent): Promise<void> {
    Logger.log('handleEmailMessageSendEvent Listener');
    await this.studentsService.sendActivationEmails(payload.email);
  }
}
