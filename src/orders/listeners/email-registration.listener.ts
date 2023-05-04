import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from 'src/email/email.service';

import { EmailRegistrationLinkEvent, events } from '../events';

@Injectable()
export class EmailRegistrationListener {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent(events.emailSendRegistrationLink, { async: true })
  async handleEmailRegistrationEvent(payload: EmailRegistrationLinkEvent): Promise<void> {
    Logger.log('handleEmailMessageSendEvent Listener');
    await this.emailService.sendRegisterConfirmation(payload.email);
  }
}
