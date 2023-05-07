import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  EmailRegistrationLinkEvent,
  EmailRegistrationLinksToStudentsEvent,
  events,
} from '../events';

@Injectable()
export class EmailEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitRegistrationEmailSendEvent(payload: EmailRegistrationLinkEvent): Promise<void> {
    const emailRegistrationLinkEvent = new EmailRegistrationLinkEvent();
    emailRegistrationLinkEvent.user = payload.user;

    await this.eventEmitter.emitAsync(events.emailSendRegistrationLink, emailRegistrationLinkEvent);
  }

  async emitRegistrationEmailsSendToStudentsEvent(
    payload: EmailRegistrationLinksToStudentsEvent,
  ): Promise<void> {
    const emailRegistrationLinksToStudentsEvent = new EmailRegistrationLinksToStudentsEvent();
    emailRegistrationLinksToStudentsEvent.students = payload.students;

    await this.eventEmitter.emitAsync(
      events.emailSendRegistrationLinksToStudents,
      emailRegistrationLinksToStudentsEvent,
    );
  }
}
