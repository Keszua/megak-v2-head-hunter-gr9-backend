import { Injectable } from '@nestjs/common';

import { UserRole } from '../types/user';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
  constructor(private readonly usersService: UsersService) {}

  async createAdmin(email: string, password: string): Promise<void> {
    const admin = await this.usersService.createUser({ email, password, role: UserRole.ADMIN });
    console.log(`Admin account created with email: ${admin.email}`);
  }
}
