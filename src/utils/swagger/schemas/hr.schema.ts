export const hrCreatedResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    fullName: { type: 'string' },
    company: { type: 'string' },
    maxReservedStudents: { type: 'number' },
    email: { type: 'string' },
    role: { type: 'string', enum: ['hr'] },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};
