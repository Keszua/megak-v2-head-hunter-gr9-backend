import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { EmailModule, EmailService } from 'src/email';
import { StudentsService } from 'src/students/students.service';
import { LinksService } from 'src/tokens/links.service';
import { TokensService } from 'src/tokens/tokens.service';
import { UsersService } from 'src/users/users.service';

import { EmailEmitter } from './emitters';
import { EmailRegistrationListener } from './listeners';

@Module({
  imports: [EventEmitterModule.forRoot(), EmailModule],
  providers: [
    EmailEmitter,
    EmailRegistrationListener,
    EmailService,
    TokensService,
    JwtService,
    StudentsService,
    LinksService,
    UsersService,
  ],
  exports: [EmailEmitter],
})
export class EventsModule {}
