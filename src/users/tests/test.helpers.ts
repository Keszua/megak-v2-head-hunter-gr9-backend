import { Test, TestingModule } from '@nestjs/testing';
import { UpdateResult } from 'typeorm';

import { UserRole } from '../../types';
import * as checkHashModule from '../../utils/hash/checkHash';
import * as hashDataModule from '../../utils/hash/hashData';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

export const userFindOneSpy = jest.spyOn(User, 'findOne');
export const userFindSpy = jest.spyOn(User, 'find');
export const userUpdateSpy = jest.spyOn(User, 'update');
export const userFindOneByOrFailSpy = jest.spyOn(User, 'findOneByOrFail');
export const hashDataSpy = jest.spyOn(hashDataModule, 'hashData');
export const checkHashSpy = jest.spyOn(checkHashModule, 'checkHash');

export async function initializeTestingModule(): Promise<UsersService> {
  jest.resetAllMocks();

  const module: TestingModule = await Test.createTestingModule({
    providers: [UsersService],
  }).compile();

  return module.get<UsersService>(UsersService);
}

export const createTestUser = (overrides?: Partial<User>): Partial<User> => ({
  id: '1',
  email: 'test@example.com',
  role: UserRole.STUDENT,
  isActive: false,
  ...overrides,
});

export const updateResult: UpdateResult = {
  raw: [],
  affected: 1,
  generatedMaps: [],
};
