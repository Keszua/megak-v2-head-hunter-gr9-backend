import { Injectable } from '@nestjs/common';

import { CreateAdminDto } from './dto/create-admin.dto';

import { UserRole } from '../types';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(private readonly usersService: UsersService) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<void> {
    const admin = await this.usersService.createUser({
      email: createAdminDto.email,
      role: UserRole.ADMIN,
    });
    await this.usersService.changePassword(admin.id, createAdminDto.password);

    await this.usersService.activateUser(admin.id);
  }
}
