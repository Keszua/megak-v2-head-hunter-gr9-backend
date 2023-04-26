import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

import { LoginDto, RegisterDto } from './dto';

import { UserResponse } from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
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

  login(user: UserResponse, res: Response): UserResponse {
    return user;
  }
}
