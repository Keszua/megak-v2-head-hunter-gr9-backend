import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';

import { AdminService } from '../admin/admin.service';

@Injectable()
@Console({
  command: 'admin',
})
export class AdminCommand {
  constructor(private readonly adminService: AdminService) {}

  @Command({
    command: 'create <email> <password>',
    description: 'Create a new admin account',
  })
  async createAdmin(email: string, password: string): Promise<void> {
    const adminData = { email, password };
    await this.adminService.createAdmin(adminData);
    console.log(`Admin account created with email: ${email}`);
  }
}
