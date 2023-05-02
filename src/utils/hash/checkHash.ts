import * as bcrypt from 'bcrypt';

export const checkHash = (data: string, hash: string): Promise<boolean> =>
  bcrypt.compare(data, hash);
