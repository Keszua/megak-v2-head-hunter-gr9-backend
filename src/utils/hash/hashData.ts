import * as bcrypt from 'bcrypt';

export const hashData = (data: string): Promise<string> => bcrypt.hash(data, 10);
