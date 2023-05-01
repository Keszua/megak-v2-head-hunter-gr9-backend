import { Entity, ManyToOne } from 'typeorm';

import { AbstractToken } from './abstract-token.entity';

import { TokenEntity } from '../../types';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'tokens_activation' })
export class ActivationToken extends AbstractToken implements TokenEntity {
  @ManyToOne(() => User, user => user.activationTokens)
  user: User;

  setExpiresIn(jwtExpirationTimeActivationToken: number): void {
    this.expiresIn = Date.now() + jwtExpirationTimeActivationToken * 1000;
  }
}
