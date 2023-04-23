import { UserEntity } from '../user';

export interface StudentEntity {
  id: string;
  user: UserEntity;
}
