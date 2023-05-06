import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { EmailRegistrationLinkEvent, events } from '../events';

@Injectable()
export class EmailEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitRegistrationEmailSendEvent(payload: EmailRegistrationLinkEvent): Promise<void> {
    const emailRegistrationLinkEvent = new EmailRegistrationLinkEvent();
    emailRegistrationLinkEvent.email = payload.email;
    Logger.log('emitRegistrationEmailSendEvent payload: ', payload);
    await this.eventEmitter.emitAsync(events.emailSendRegistrationLink, emailRegistrationLinkEvent);
  }
}
