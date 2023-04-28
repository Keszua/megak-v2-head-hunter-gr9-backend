import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/')
  async createUser(@Body() userData: CreateUserDto): Promise<void> {
    await this.userService.createUser(userData);
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string): Promise<void> {
    await this.userService.getUser(userId);
  }
}
