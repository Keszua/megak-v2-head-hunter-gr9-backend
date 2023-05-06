import { Controller, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:userId')
  async getUser(@Param('userId') userId: string): Promise<void> {
    await this.userService.getUserById(userId);
  }
}
