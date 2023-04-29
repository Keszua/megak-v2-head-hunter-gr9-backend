import { Injectable } from '@nestjs/common';

import { RegisterDto } from './dto';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async register(registerDto: RegisterDto): Promise<void> {
    const user = await this.usersService.getUserByEmail(registerDto.email);
    await this.usersService.changePassword(user.id, registerDto.password);
    await this.usersService.activateUser(user.id);
  }
}
