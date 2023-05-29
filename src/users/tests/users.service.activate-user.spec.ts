import { NotFoundException } from '@nestjs/common';

import { initializeTestingModule, updateResult, userUpdateSpy } from './test.helpers';

import { UsersService } from '../users.service';

// eslint-disable-next-line max-lines-per-function
describe('UsersService - activateUser', () => {
  let service: UsersService;
  const userId = '1';

  beforeEach(async () => {
    service = await initializeTestingModule();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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
