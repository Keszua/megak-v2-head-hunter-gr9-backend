import { Entity, ManyToOne } from 'typeorm';

import { AbstractToken } from './abstract-token.entity';

import { TokenEntity } from '../../types';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'tokens_refresh' })
export class RefreshToken extends AbstractToken implements TokenEntity {
  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;

  setExpiresIn(jwtExpirationTimeRefreshToken: number): void {
    this.expiresIn = Date.now() + jwtExpirationTimeRefreshToken * 1000;
  }
}
