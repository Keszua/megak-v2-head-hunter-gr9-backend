import { Injectable, Logger } from '@nestjs/common';
import { Response } from 'express';

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

  async getUser(userId: string, res: Response): Promise<void> {
    const user = await User.findOneByOrFail({ id: userId }).catch(e => Logger.log(e));
    res.json(user);
  }
}
