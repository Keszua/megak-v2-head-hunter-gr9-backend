import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { hashData } from '../utils';

@Injectable()
export class UsersService {
  async createUser(userData: CreateUserDto): Promise<User> {
    const { email, password, role } = userData;
    const user = new User();
    user.email = email;
    user.hashPwd = password ? await hashData(password) : null;
    user.role = role;
    return user.save();
  }

  getUser(userId: string): Promise<User> {
    return User.findOneByOrFail({ id: userId });
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
    
  async getAllEmails(): Promise<string[]> {
    const users = await User.find();
    return users.map(user => user.email);
  }
}
