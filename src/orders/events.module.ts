import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { EmailModule, EmailService } from 'src/email';
import { TokensService } from 'src/tokens/tokens.service';

import { EmailEmitter } from './emitters';
import { EmailRegistrationListener } from './listeners';

@Module({
  imports: [EventEmitterModule.forRoot(), EmailModule],
  providers: [EmailEmitter, EmailRegistrationListener, EmailService, TokensService, JwtService],
  exports: [EmailEmitter],
})
export class EventsModule {}
