import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

import { UserRole } from '../types';
import * as checkHashModule from '../utils/hash/checkHash';
import * as hashDataModule from '../utils/hash/hashData';

describe('UsersService', () => {
  let service: UsersService;
  const userFindOneSpy = jest.spyOn(User, 'findOne');
  const userFindSpy = jest.spyOn(User, 'find');
  const userUpdateSpy = jest.spyOn(User, 'update');
  const userFindOneByOrFailSpy = jest.spyOn(User, 'findOneByOrFail');
  const hashDataSpy = jest.spyOn(hashDataModule, 'hashData');
  const checkHashSpy = jest.spyOn(checkHashModule, 'checkHash');

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    userFindOneSpy.mockReset();
    userFindSpy.mockReset();
    userUpdateSpy.mockReset();
    userFindOneByOrFailSpy.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        role: UserRole.STUDENT,
      };
      const createdUser: Partial<User> = {
        id: '1',
        email: 'test@example.com',
        role: UserRole.STUDENT,
        isActive: false,
      };

      userFindOneSpy.mockResolvedValueOnce(undefined);
      jest.spyOn(User.prototype, 'save').mockResolvedValueOnce(createdUser as User);

      const result = await service.createUser(createUserDto);

      expect(result).toEqual(createdUser);
      expect(userFindOneSpy).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
    });

    it('should throw an error if the user with the email already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        role: UserRole.STUDENT,
      };

      const existingUser: Partial<User> = {
        id: '1',
        email: 'test@example.com',
        role: UserRole.STUDENT,
        isActive: false,
      };

      userFindOneSpy.mockResolvedValueOnce(existingUser as User);

      await expect(service.createUser(createUserDto)).rejects.toThrowError(
        new BadRequestException('User with this email already exists'),
      );

      expect(userFindOneSpy).toHaveBeenCalledWith({ where: { email: createUserDto.email } });
    });
  });

  describe('getUserById', () => {
    const userId = '1';
    const user: Partial<User> = {
      id: userId,
      email: 'test@example.com',
      role: UserRole.STUDENT,
      isActive: false,
      hashPwd: 'hashed_password',
    };

    const userWithoutHashPwd: Partial<User> = {
      id: userId,
      email: 'test@example.com',
      role: UserRole.STUDENT,
      isActive: false,
    };

    afterEach(() => {
      userFindOneByOrFailSpy.mockReset();
    });

    it('should return a user by id without hashPwd', async () => {
      userFindOneByOrFailSpy.mockResolvedValueOnce(user as User);
      const result = await service.getUserById(userId);
      expect(result).toEqual(userWithoutHashPwd);
      expect(userFindOneByOrFailSpy).toHaveBeenCalledWith({ id: userId });
    });

    it('should throw an error if the user is not found', async () => {
      userFindOneByOrFailSpy.mockRejectedValueOnce(new Error('User not found'));
      await expect(service.getUserById(userId)).rejects.toThrowError('User not found');
    });
  });

  describe('activateUser', () => {
    const userId = '1';
    const updateResult: UpdateResult = {
      raw: [],
      affected: 1,
      generatedMaps: [],
    };

    it('should activate the user', async () => {
      userUpdateSpy.mockResolvedValueOnce(updateResult);

      await service.activateUser(userId);

      expect(userUpdateSpy).toHaveBeenCalledWith(userId, { isActive: true });
    });

    it('should throw an error if the user is not found', async () => {
      userUpdateSpy.mockResolvedValueOnce({ ...updateResult, affected: 0 });

      await expect(service.activateUser(userId)).rejects.toThrowError(NotFoundException);

      expect(userUpdateSpy).toHaveBeenCalledWith(userId, { isActive: true });
    });
  });

  describe('getUserByEmail', () => {
    const userEmail = 'test@example.com';
    const user: Partial<User> = {
      id: '1',
      email: userEmail,
      role: UserRole.STUDENT,
      isActive: false,
    };

    it('should return a user by email', async () => {
      userFindOneSpy.mockResolvedValueOnce(user as User);

      const result = await service.getUserByEmail(userEmail);

      expect(result).toEqual(user);
      expect(userFindOneSpy).toHaveBeenCalledWith({ where: { email: userEmail } });
    });

    it('should return null if the user is not found', async () => {
      userFindOneSpy.mockResolvedValueOnce(undefined);

      const result = await service.getUserByEmail(userEmail);

      expect(result).toBeUndefined();
      expect(userFindOneSpy).toHaveBeenCalledWith({ where: { email: userEmail } });
    });
  });

  describe('getAllEmails', () => {
    it('should return all emails', async () => {
      const sampleUsers = [
        { id: '1', email: 'user1@example.com', role: 'user', isActive: true },
        { id: '2', email: 'user2@example.com', role: 'user', isActive: false },
      ];
      userFindSpy.mockResolvedValue(sampleUsers as User[]);

      const result = await service.getAllEmails();

      expect(userFindSpy).toHaveBeenCalledWith({ select: { email: true } });
      expect(result).toEqual(['user1@example.com', 'user2@example.com']);
    });

    it('should return an empty array when no users are found', async () => {
      userFindSpy.mockResolvedValue([]);
      const result = await service.getAllEmails();

      expect(userFindSpy).toHaveBeenCalledWith({ select: { email: true } });
      expect(result).toEqual([]);
    });
  });

  describe('changePassword', () => {
    const userId = '1';
    const newPassword = 'new-password';
    const hashedPassword = 'new-hashed-password';
    const updateResult: UpdateResult = {
      raw: [],
      affected: 1,
      generatedMaps: [],
    };

    beforeEach(() => {
      hashDataSpy.mockResolvedValue(hashedPassword);
      userUpdateSpy.mockResolvedValue(updateResult);
    });

    it('should change the user password', async () => {
      await service.changePassword(userId, newPassword);

      expect(hashDataSpy).toHaveBeenCalledWith(newPassword);
      expect(userUpdateSpy).toHaveBeenCalledWith(userId, { hashPwd: hashedPassword });
    });

    it('should throw an error if the user is not found', async () => {
      userUpdateSpy.mockResolvedValue({ ...updateResult, affected: 0 });

      await expect(service.changePassword(userId, newPassword)).rejects.toThrow(NotFoundException);
      await expect(service.changePassword(userId, newPassword)).rejects.toThrowError(
        'User not found',
      );
    });
  });

  describe('hashPassword', () => {
    const password = 'password';
    const hashedPassword = 'hashed-password';

    beforeEach(() => {
      hashDataSpy.mockResolvedValue(hashedPassword);
    });

    it('should hash the password', async () => {
      const result = await service.hashPassword(password);

      expect(hashDataSpy).toHaveBeenCalledWith(password);
      expect(result).toEqual(hashedPassword);
    });
  });

  describe('isPasswordValid', () => {
    const password = 'password';
    const hashedPassword = 'hashed-password';

    beforeEach(() => {
      checkHashSpy.mockResolvedValue(true);
    });

    it('should check if the password is valid', async () => {
      const result = await service.isPasswordValid(password, hashedPassword);

      expect(checkHashSpy).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBeTruthy();
    });

    it('should return false if the password is not valid', async () => {
      checkHashSpy.mockResolvedValue(false);

      const result = await service.isPasswordValid(password, hashedPassword);

      expect(checkHashSpy).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBeFalsy();
    });
  });
});
