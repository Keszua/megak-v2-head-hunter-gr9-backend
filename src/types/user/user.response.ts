import { UserEntity } from './user';

export type UserResponse = Omit<UserEntity, 'hashPwd'>;
