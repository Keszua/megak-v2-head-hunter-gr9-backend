import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { CookiesService } from './cookies.service';
import { LoginDto, RegisterDto } from './dto';

import { TokensService } from '../tokens/tokens.service';
import { CookiesNames, TokenOptions, UserResponse } from '../types';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly cookiesService: CookiesService,
  ) {}
  async register(registerDto: RegisterDto): Promise<void> {
    const user = await this.usersService.getUserByEmail(registerDto.email);
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
    // TODO: add revoke active refresh token
    await this.generateAuthTokenAndSetCookie(user, res, { tokenType: 'authentication' });
    await this.generateAuthTokenAndSetCookie(user, res, { tokenType: 'refresh' });
  }

  getAuthenticatedUserByAuthenticationToken(userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }
}
