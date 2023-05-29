import { createTestUser, initializeTestingModule, userFindOneSpy } from './test.helpers';

import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

// eslint-disable-next-line max-lines-per-function
describe('UsersService - getUserByEmail', () => {
  let service: UsersService;
  const userEmail = 'test@example.com';
  const user = createTestUser({ email: userEmail });

  beforeEach(async () => {
    service = await initializeTestingModule();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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
