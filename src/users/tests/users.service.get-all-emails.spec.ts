import { initializeTestingModule, userFindSpy } from './test.helpers';

import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

// eslint-disable-next-line max-lines-per-function
describe('UsersService - getAllEmails', () => {
  let service: UsersService;

  beforeEach(async () => {
    service = await initializeTestingModule();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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
