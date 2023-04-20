import { Injectable } from '@nestjs/common';

import { CreateAdminDto } from './dto/create-admin.dto';

import { UserRole } from '../types/user';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(private readonly usersService: UsersService) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<void> {
    await this.usersService.createUser({
      email: createAdminDto.email,
      password: createAdminDto.password,
      role: UserRole.ADMIN,
    });
  }
}
