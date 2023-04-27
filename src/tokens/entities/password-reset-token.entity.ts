import { BeforeInsert, Entity, ManyToOne } from 'typeorm';

import { AbstractToken } from './abstract-token.entity';

import { TokenEntity } from '../../types';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'tokens_password_reset' })
export class PasswordResetToken extends AbstractToken implements TokenEntity {
  @ManyToOne(() => User, user => user.passwordResetTokens)
  user: User;

  @BeforeInsert()
  setExpiresIn(jwtExpirationTimePasswordResetToken: number): void {
    this.expiresIn = Date.now() + jwtExpirationTimePasswordResetToken * 1000;
  }
}
