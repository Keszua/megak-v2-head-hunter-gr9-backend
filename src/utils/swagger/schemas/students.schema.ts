export const csvFileSchema = {
  type: 'object',
  properties: {
    csv: {
      type: 'string',
      format: 'binary',
    },
  },
};

export const importStudentsResultResponseSchema = {
  type: 'object',
  properties: {
    added: {
      type: 'object',
      properties: {
        count: { type: 'number' },
        details: { type: 'array', items: { type: 'string' } },
      },
    },
    errors: {
      type: 'object',
      properties: {
        csvDuplicates: {
          type: 'object',
          properties: {
            count: { type: 'number' },
            details: { type: 'array', items: { type: 'string' } },
          },
        },
        databaseDuplicates: {
          type: 'object',
          properties: {
            count: { type: 'number' },
            details: { type: 'array', items: { type: 'string' } },
          },
        },
        invalidEmails: {
          type: 'object',
          properties: {
            count: { type: 'number' },
            details: { type: 'array', items: { type: 'string' } },
          },
        },
      },
    },
  },
};
