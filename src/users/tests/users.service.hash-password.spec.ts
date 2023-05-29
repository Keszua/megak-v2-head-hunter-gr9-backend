import { hashDataSpy, initializeTestingModule } from './test.helpers';

import { UsersService } from '../users.service';

describe('UsersService - hashPassword', () => {
  let service: UsersService;
  const password = 'password';
  const hashedPassword = 'hashed-password';

  beforeEach(async () => {
    service = await initializeTestingModule();
    hashDataSpy.mockResolvedValue(hashedPassword);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should hash the password', async () => {
    const result = await service.hashPassword(password);

    expect(hashDataSpy).toHaveBeenCalledWith(password);
    expect(result).toEqual(hashedPassword);
  });
});
