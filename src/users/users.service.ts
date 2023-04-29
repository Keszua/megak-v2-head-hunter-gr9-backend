import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { checkHash, hashData } from '../utils';

@Injectable()
export class UsersService {
  async createUser(userData: CreateUserDto): Promise<User> {
    const { email, password, role } = userData;
    const user = new User();
    user.email = email;
    user.hashPwd = password ? await this.hashPassword(password) : null;
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
    await User.update(id, { hashPwd: await hashData(password) });
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
