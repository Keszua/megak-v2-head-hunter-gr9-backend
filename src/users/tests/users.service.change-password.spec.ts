import { NotFoundException } from '@nestjs/common';

import { hashDataSpy, initializeTestingModule, updateResult, userUpdateSpy } from './test.helpers';

import { UsersService } from '../users.service';

// eslint-disable-next-line max-lines-per-function
describe('UsersService - changePassword', () => {
  let service: UsersService;
  const userId = '1';
  const newPassword = 'new-password';
  const hashedPassword = 'new-hashed-password';
  beforeEach(async () => {
    service = await initializeTestingModule();
    hashDataSpy.mockResolvedValue(hashedPassword);
    userUpdateSpy.mockResolvedValue(updateResult);
  });

  afterEach(() => {
    jest.resetAllMocks();
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
