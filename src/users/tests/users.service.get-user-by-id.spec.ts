import { createTestUser, initializeTestingModule, userFindOneByOrFailSpy } from './test.helpers';

import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

// eslint-disable-next-line max-lines-per-function
describe('UsersService - getUserById', () => {
  let service: UsersService;
  const userId = '1';
  const user = createTestUser({ hashPwd: 'hashed_password' });

  const userWithoutHashPwd = createTestUser();

  beforeEach(async () => {
    service = await initializeTestingModule();
  });

  afterEach(() => {
    jest.resetAllMocks();
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
