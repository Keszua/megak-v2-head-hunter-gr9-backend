import { checkHashSpy, initializeTestingModule } from './test.helpers';

import { UsersService } from '../users.service';

// eslint-disable-next-line max-lines-per-function
describe('UsersService - isPasswordValid', () => {
  let service: UsersService;
  const password = 'password';
  const hashedPassword = 'hashed-password';

  beforeEach(async () => {
    service = await initializeTestingModule();
    checkHashSpy.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.resetAllMocks();
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
