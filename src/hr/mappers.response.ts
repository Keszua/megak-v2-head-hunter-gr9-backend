import { Hr } from './entities/hr.entity';

import { HrCreatedResponse } from '../types';

export const mapHrCreatedResponse = (hr: Hr): HrCreatedResponse => {
  return {
    id: hr.id,
    fullName: hr.fullName,
    company: hr.company,
    maxReservedStudents: hr.maxReservedStudents,
    role: hr.user.role,
    email: hr.user.email,
    createdAt: hr.createdAt,
    updatedAt: hr.updatedAt,
  };
};
