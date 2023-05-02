import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { CookiesService } from './cookies.service';
import { LoginDto, RegisterDto } from './dto';

import { UnauthorizedTokenException } from '../common';
import { TokensService } from '../tokens/tokens.service';
import { CookiesNames, TokenOptions, TokenPayload, UserResponse } from '../types';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { TokenErrorCodes } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly cookiesService: CookiesService,
  ) {}
  async register(registerDto: RegisterDto): Promise<void> {
    const user = await this.usersService.getUserByEmail(registerDto.email);
    if (user.hashPwd) {
      throw new BadRequestException('User already exists');
    }
    await this.usersService.changePassword(user.id, registerDto.password);
    await this.usersService.activateUser(user.id);
  }

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const loginDto = plainToInstance(LoginDto, { email, password });
    const user = await this.usersService.getUserByEmail(loginDto.email);
    if (user && user.isActive) {
      const isPasswordValid = await this.usersService.isPasswordValid(
        loginDto.password,
        user.hashPwd,
      );
      if (isPasswordValid) {
        const { hashPwd, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: User, res: Response): Promise<UserResponse> {
    await this.renewAuthAndRefreshTokensAndSetCookies(user, res);
    return user;
  }

  async generateAuthTokenAndSetCookie(
    user: User,
    res: Response,
    options: TokenOptions,
  ): Promise<void> {
    let cookieName: CookiesNames;
    const { tokenType } = options;
    const { token, expiresIn } = await this.tokensService.createToken(user, { tokenType });

    switch (tokenType) {
      case 'refresh':
        cookieName = CookiesNames.REFRESH;
        break;
      case 'authentication':
        cookieName = CookiesNames.AUTHENTICATION;
        break;
      default:
        throw new BadRequestException('Invalid token type');
    }

    this.cookiesService.setTokenInCookie(res, cookieName, {
      token,
      expiresIn,
    });
  }

  async renewAuthAndRefreshTokensAndSetCookies(user: User, res: Response): Promise<void> {
    await this.tokensService.revokeActiveRefreshToken(user.id);
    await this.generateAuthTokenAndSetCookie(user, res, { tokenType: 'authentication' });
    await this.generateAuthTokenAndSetCookie(user, res, { tokenType: 'refresh' });
  }

  getAuthenticatedUserByAuthenticationToken(userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  async getAuthenticatedUserByRefreshToken(
    refreshToken: string,
    payload: TokenPayload,
  ): Promise<User> {
    const { userId, tokenType } = payload;
    const user = await this.usersService.getUserById(userId);
    const tokenActive = await this.tokensService.getTokenActiveByUserId(userId, { tokenType });
    if (!tokenActive) {
      throw new UnauthorizedTokenException(TokenErrorCodes.ACTIVE_REFRESH_TOKEN_NOT_FOUND);
    }
    await this.tokensService.verifyToken(refreshToken, tokenActive.hashToken);
    await this.tokensService.markTokenAsUsed(tokenActive);
    return user;
  }

  async getNewAuthenticatedTokensByRefreshToken(user: User, res: Response): Promise<UserResponse> {
    await this.renewAuthAndRefreshTokensAndSetCookies(user, res);
    return user;
  }

  async logout(user: User, res: Response): Promise<void> {
    this.cookiesService.clearCookie(res, CookiesNames.AUTHENTICATION);
    this.cookiesService.clearCookie(res, CookiesNames.REFRESH);
    await this.tokensService.revokeActiveRefreshToken(user.id);
  }
}
