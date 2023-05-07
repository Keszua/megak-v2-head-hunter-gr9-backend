import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { EmailEmitter } from './emitters';
import { EmailListener } from './listeners';

import { eventEmmiterConfig } from '../config';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EventEmitterModule.forRoot(eventEmmiterConfig), EmailModule],
  providers: [EmailEmitter, EmailListener],
  exports: [EmailEmitter],
})
export class EventsModule {}
