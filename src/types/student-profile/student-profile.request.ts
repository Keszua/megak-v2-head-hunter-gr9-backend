import { StudentProfileEntity } from './student-profile';

export type StudentProfileRequest = Omit<
  StudentProfileEntity,
  'id' | 'student' | 'createdAt' | 'updatedAt'
>;
