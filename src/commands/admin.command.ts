import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { Injectable } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';

import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';

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
    const createAdminDto = plainToInstance(CreateAdminDto, { email, password });
    const errors = await validate(createAdminDto);

    if (errors.length > 0) {
      console.error('Validation failed:', errors[0].constraints);
      return;
    }
    await this.adminService.createAdmin(createAdminDto);
    console.log(`Admin account created with email: ${email}`);
  }
}
