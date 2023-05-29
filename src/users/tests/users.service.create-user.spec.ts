import { BadRequestException } from '@nestjs/common';

import { createTestUser, initializeTestingModule, userFindOneSpy } from './test.helpers';

import { UserRole } from '../../types';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

// eslint-disable-next-line max-lines-per-function
describe('UsersService - createUser', () => {
  let service: UsersService;

  const createUserDto: CreateUserDto = {
    email: 'test@example.com',
    role: UserRole.STUDENT,
  };

  beforeEach(async () => {
    service = await initializeTestingModule();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a user successfully', async () => {
    const createdUser = createTestUser();
    userFindOneSpy.mockResolvedValueOnce(undefined);
    jest.spyOn(User.prototype, 'save').mockResolvedValueOnce(createdUser as User);
    const result = await service.createUser(createUserDto);
    expect(result).toEqual(createdUser);
    expect(userFindOneSpy).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
  });

  it('should throw an error if the user with the email already exists', async () => {
    const existingUser = createTestUser();
    userFindOneSpy.mockResolvedValueOnce(existingUser as User);
    await expect(service.createUser(createUserDto)).rejects.toThrowError(
      new BadRequestException('User with this email already exists'),
    );
    expect(userFindOneSpy).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
  });
});
