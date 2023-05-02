import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { checkHash, hashData } from '../utils';

@Injectable()
export class UsersService {
  async createUser(userDto: CreateUserDto): Promise<User> {
    const { email, role } = userDto;
    if (await this.getUserByEmail(email)) {
      Logger.warn(`User with this email already exists`, UsersService.name);
      throw new BadRequestException(`User with this email already exists`);
    }
    const user = new User();
    user.email = email;
    user.role = role;
    return user.save();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await User.findOneByOrFail({ id: userId });
    delete user.hashPwd;
    return user;
  }

  async activateUser(id: string): Promise<void> {
    await User.update(id, { isActive: true });
  }

  getUserByEmail(email: string): Promise<User> {
    return User.findOneOrFail({
      where: { email },
    });
  }

  async changePassword(id: string, password: string): Promise<void> {
    await User.update(id, { hashPwd: await this.hashPassword(password) });
  }

  hashPassword(password: string): Promise<string> {
    return hashData(password);
  }

  isPasswordValid(password: string, hashPwd: string): Promise<boolean> {
    return checkHash(password, hashPwd);
  }

  async getAllEmails(): Promise<string[]> {
    const users = await User.find({ select: { email: true } });
    return users.map(user => user.email);
  }
}
