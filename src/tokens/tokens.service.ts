import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';

import { ActivationToken, PasswordResetToken, RefreshToken } from './entities';
import { TokenEntityType } from './types';

import {
  DecodedToken,
  JwtTokenOptions,
  TokenData,
  TokenOptions,
  TokenPayload,
  ValidTokenRequest,
} from '../types';
import { User } from '../users/entities/user.entity';
import { checkHash, hashData } from '../utils';

@Injectable()
export class TokensService {
  private readonly jwtSecretActivationToken = this.configService.get<string>(
    'JWT_SECRET_ACTIVATION_TOKEN',
  );
  private readonly jwtExpirationTimeActivationToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_ACTIVATION_TOKEN',
  );
  private readonly jwtSecretPasswordResetToken = this.configService.get<string>(
    'JWT_SECRET_PASSWORD_RESET_TOKEN',
  );
  private readonly jwtExpirationTimePasswordResetToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_PASSWORD_RESET_TOKEN',
  );
  private readonly jwtSecretRefreshToken = this.configService.get<string>(
    'JWT_SECRET_REFRESH_TOKEN',
  );
  private readonly jwtExpirationTimeRefreshToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_REFRESH_TOKEN',
  );
  private readonly jwtSecretAuthenticationToken = this.configService.get<string>(
    'JWT_SECRET_AUTHENTICATION_TOKEN',
  );
  private readonly jwtExpirationTimeAuthenticationToken = this.configService.get<number>(
    'JWT_EXPIRATION_TIME_AUTHENTICATION_TOKEN',
  );
  private readonly clientUrl = this.configService.get<string>('CLIENT_URL');

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async createToken(user: User, options: TokenOptions): Promise<TokenData> {
    const { tokenType } = options;
    let tokenData: TokenData;

    if (tokenType === 'authentication') {
      tokenData = await this.generateToken(user.id, tokenType);
    } else {
      tokenData = await this.createAndSaveToken(user, tokenType);
    }

    return tokenData;
  }

  async verifyToken(data: string, hashedData: string): Promise<void> {
    let isTokenValid: boolean;

    try {
      isTokenValid = await checkHash(data, hashedData);
    } catch (error) {
      Logger.error(`Error verify token: ${error.message}`);
      isTokenValid = false;
    }

    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid or expired token!');
    }
  }

  async decodeToken({ type, token }: ValidTokenRequest): Promise<DecodedToken> {
    let payload: TokenPayload;

    try {
      payload = await this.jwtService.verify(token, {
        secret: this.getJwtTokenOptionsByType(type).secret,
      });
    } catch (error) {
      Logger.error(`Error decoding token: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired token!');
    }
    if (!payload || !payload.userId || !payload.tokenType || payload.tokenType !== type) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return { userId: payload.userId, tokenType: payload.tokenType };
  }

  private async createAndSaveToken(
    user: User,
    tokenType: TokenOptions['tokenType'],
  ): Promise<TokenData> {
    const tokenEntity = this.createTokenEntity(tokenType);
    const tokenData = await this.generateToken(user.id, tokenType);
    await this.saveTokenInDatabase(tokenEntity, tokenData.token, user, tokenType);
    return tokenData;
  }

  private createTokenEntity(tokenType: TokenOptions['tokenType']): TokenEntityType {
    switch (tokenType) {
      case 'activation':
        return new ActivationToken();
      case 'password-reset':
        return new PasswordResetToken();
      case 'refresh':
        return new RefreshToken();
      default:
        throw new BadRequestException('Invalid token type');
    }
  }

  private async saveTokenInDatabase(
    tokenEntity: TokenEntityType,
    token: string,
    user: User,
    tokenType: TokenOptions['tokenType'],
  ): Promise<void> {
    tokenEntity.hashToken = await hashData(token);
    tokenEntity.user = user;
    tokenEntity.setExpiresIn(this.getExpirationTimeForTokenType(tokenType));
    await this.dataSource.manager.save(tokenEntity);
  }

  private getExpirationTimeForTokenType(tokenType: TokenOptions['tokenType']): number {
    switch (tokenType) {
      case 'activation':
        return this.jwtExpirationTimeActivationToken;
      case 'password-reset':
        return this.jwtExpirationTimePasswordResetToken;
      case 'refresh':
        return this.jwtExpirationTimeRefreshToken;
      default:
        throw new BadRequestException('Invalid token type');
    }
  }

  private generateToken(userId: string, tokenType: TokenOptions['tokenType']): TokenData {
    const payload: TokenPayload = { userId, tokenType };
    const { secret, expiresIn } = this.getJwtTokenOptionsByType(tokenType);
    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    return {
      token,
      expiresIn,
    };
  }

  private getJwtTokenOptionsByType(tokenType: TokenOptions['tokenType']): JwtTokenOptions {
    let secret: string, expiresIn: number;
    switch (tokenType) {
      case 'activation':
        secret = this.jwtSecretActivationToken;
        expiresIn = this.jwtExpirationTimeActivationToken;
        break;
      case 'password-reset':
        secret = this.jwtSecretPasswordResetToken;
        expiresIn = this.jwtExpirationTimePasswordResetToken;
        break;
      case 'refresh':
        secret = this.jwtSecretRefreshToken;
        expiresIn = this.jwtExpirationTimeRefreshToken;
        break;
      case 'authentication':
        secret = this.jwtSecretAuthenticationToken;
        expiresIn = this.jwtExpirationTimeAuthenticationToken;
        break;
      default:
        throw new BadRequestException('Invalid token type');
    }

    return { secret, expiresIn };
  }
}
