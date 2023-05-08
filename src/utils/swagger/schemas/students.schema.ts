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

export const studentProfileResponseSchema = {
  type: 'object',
  properties: {
    studentId: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    details: {
      type: 'object',
      properties: {
        profile: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            githubUsername: { type: 'string' },
            tel: { type: 'string', nullable: true },
            email: { type: 'string' },
            bio: { type: 'string', nullable: true },
          },
        },
        grades: {
          type: 'object',
          properties: {
            courseCompletion: { type: 'number' },
            courseEngagement: { type: 'number' },
            projectDegree: { type: 'number' },
            teamProjectDegree: { type: 'number' },
          },
        },
        portfolio: {
          type: 'object',
          properties: {
            portfolioUrls: { type: 'array', items: { type: 'string' } },
            projectUrls: { type: 'array', items: { type: 'string' } },
            bonusProjectUrls: { type: 'array', items: { type: 'string' } },
          },
        },
        employmentExpectations: {
          type: 'object',
          properties: {
            expectedTypeWork: {
              type: 'string',
              enum: ['onsite', 'relocation_ready', 'remote_only', 'hybrid', 'no_preference'],
            },
            targetWorkCity: { type: 'string', nullable: true },
            expectedContractType: {
              type: 'string',
              enum: ['uop_only', 'b2b_possible', 'uz_uod_possible', 'no_preference'],
            },
            expectedSalary: { type: 'string', nullable: true },
            canTakeApprenticeship: { type: 'boolean' },
            monthsOfCommercialExp: { type: 'number' },
          },
        },
        educationAndExperience: {
          type: 'object',
          properties: {
            education: { type: 'string', nullable: true },
            courses: { type: 'string', nullable: true },
            workExperience: { type: 'string', nullable: true },
          },
        },
      },
    },
  },
};

export const getAllStudentsResponseSchema = {
  type: 'object',
  properties: {
    students: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          grades: {
            type: 'object',
            properties: {
              courseCompletion: { type: 'integer' },
              courseEngagement: { type: 'integer' },
              projectDegree: { type: 'integer' },
              teamProjectDegree: { type: 'integer' },
            },
          },
          profile: {
            type: 'object',
            properties: {
              expectedTypeWork: { type: 'string' },
              targetWorkCity: { type: 'string' },
              expectedContractType: { type: 'string' },
              expectedSalary: { type: 'string' },
              canTakeApprenticeship: { type: 'boolean' },
              monthsOfCommercialExp: { type: 'integer' },
            },
          },
        },
      },
    },
    meta: {
      type: 'object',
      properties: {
        take: { type: 'string' },
        itemCount: { type: 'integer' },
        pageCount: { type: 'integer' },
        hasPreviousPage: { type: 'boolean' },
        hasNextPage: { type: 'boolean' },
      },
    },
  },
};

export const getOneStudentResponseSchema = {
  type: 'object',
  properties: {
    studentId: {
      type: 'string',
    },
    details: {
      type: 'object',
      properties: {
        profile: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
            githubUsername: {
              type: 'string',
            },
            tel: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            bio: {
              type: 'string',
            },
          },
        },
        grades: {
          type: 'object',
          properties: {
            courseCompletion: {
              type: 'integer',
            },
            courseEngagement: {
              type: 'integer',
            },
            projectDegree: {
              type: 'integer',
            },
            teamProjectDegree: {
              type: 'integer',
            },
          },
        },
        portfolio: {
          type: 'object',
          properties: {
            portfolioUrls: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            projectUrls: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            bonusProjectUrls: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        employmentExpectations: {
          type: 'object',
          properties: {
            expectedTypeWork: {
              type: 'string',
            },
            targetWorkCity: {
              type: 'string',
            },
            expectedContractType: {
              type: 'string',
            },
            expectedSalary: {
              type: 'string',
            },
            canTakeApprenticeship: {
              type: 'boolean',
            },
            monthsOfCommercialExp: {
              type: 'integer',
            },
          },
        },
        educationAndExperience: {
          type: 'object',
          properties: {
            education: {
              type: 'string',
            },
            courses: {
              type: 'string',
            },
            workExperience: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
