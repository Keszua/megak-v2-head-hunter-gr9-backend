import { BeforeInsert, Entity, ManyToOne } from 'typeorm';

import { AbstractToken } from './abstract-token.entity';

import { TokenEntity } from '../../types';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'tokens_refresh' })
export class RefreshToken extends AbstractToken implements TokenEntity {
  @ManyToOne(() => User, user => user.refreshTokens)
  user: User;

  @BeforeInsert()
  setExpiresIn(): void {
    this.expiresIn = Date.now() + 60 * 60 * 10 * 1000;
  }
}
