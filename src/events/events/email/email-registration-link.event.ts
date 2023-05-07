import { User } from '../../../users/entities/user.entity';

export class EmailRegistrationLinkEvent {
  user: User;
}
