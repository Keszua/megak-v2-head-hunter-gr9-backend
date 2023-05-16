import { StudentProfileEntity } from './student-profile';

export type StudentProfileRequest = Omit<
  StudentProfileEntity,
  'id' | 'student' | 'createdAt' | 'updatedAt'
>;

export enum ExpectedTypeWork {
  ONSITE = 'onsite',
  RELOCATION_READY = 'relocation_ready',
  REMOTE_ONLY = 'remote_only',
  HYBRID = 'hybrid',
  NO_PREFERENCE = 'no_preference',
}

export enum ExpectedContractType {
  UOP_ONLY = 'uop_only',
  B2B_POSSIBLE = 'b2b_possible',
  UZ_UOD_POSSIBLE = 'uz_uod_possible',
  NO_PREFERENCE = 'no_preference',
}
