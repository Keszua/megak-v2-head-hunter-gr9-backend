import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Command, Console } from 'nestjs-console';
import { QueryFailedError } from 'typeorm';

import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { getMysqlErrorMessage } from '../utils';

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

    if (!(await this.handleValidationErrors(createAdminDto))) {
      return;
    }

    try {
      await this.adminService.createAdmin(createAdminDto);
      Logger.log(`Admin account created with email: ${email}`, AdminCommand.name);
    } catch (error) {
      this.handleError(error);
    }
  }

  private async handleValidationErrors(createAdminDto: CreateAdminDto): Promise<boolean> {
    const errors = await validate(createAdminDto);
    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints)).flat();
      Logger.error(`ValidationError: ${JSON.stringify(errorMessages)}`, AdminCommand.name);
      return false;
    }
    return true;
  }

  private handleError(error: Error): void {
    if (error instanceof QueryFailedError) {
      const { code } = error.driverError;
      const message = getMysqlErrorMessage(code);
      Logger.error(`${error.name}: ${message}. Code: ${code}`, AdminCommand.name);
    } else {
      Logger.error(`Unexpected error: ${error.message}`, AdminCommand.name);
    }
  }
}
