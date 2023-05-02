import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UnauthorizedTokenException } from '../../common';
import { TokenPayload } from '../../types';
import { User } from '../../users/entities/user.entity';
import { TokenErrorCodes } from '../../utils';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          if (!request?.cookies?.Authentication) {
            throw new UnauthorizedTokenException(TokenErrorCodes.TOKEN_NOT_FOUND);
          }
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET_AUTHENTICATION_TOKEN'),
    });
  }

  validate(payload: TokenPayload): Promise<User> {
    if (!payload) {
      throw new UnauthorizedTokenException(TokenErrorCodes.TOKEN_PAYLOAD_INVALID);
    }
    if (!payload.userId) {
      throw new UnauthorizedTokenException(TokenErrorCodes.TOKEN_PAYLOAD_USERID_MISSING);
    }
    if (!payload.tokenType) {
      throw new UnauthorizedTokenException(TokenErrorCodes.TOKEN_PAYLOAD_TOKEN_TYPE_MISSING);
    }
    if (payload.tokenType !== 'authentication') {
      throw new UnauthorizedTokenException(TokenErrorCodes.TOKEN_PAYLOAD_TOKEN_TYPE_INVALID);
    }
    try {
      return this.authService.getAuthenticatedUserByAuthenticationToken(payload.userId);
    } catch (error) {
      throw new UnauthorizedTokenException(TokenErrorCodes.TOKEN_EXPIRED);
    }
  }
}
