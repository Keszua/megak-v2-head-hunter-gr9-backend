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
    user.hashPwd = await hashData(password);
    user.role = role;
    return user.save();
  }

  getUser(userId: string): Promise<User> {
    return User.findOneByOrFail({ id: userId });
  }
}
