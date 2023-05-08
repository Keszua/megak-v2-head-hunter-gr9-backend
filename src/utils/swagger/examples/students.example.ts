export const importStudentsResultResponseExample = {
  added: {
    count: 6,
    details: [
      'lukasz.ostrowski@example.com',
      'jan.kowalski@example.com',
      'adam.nowak@example.com',
      'jakub.krol@megak.pl',
      'magdalena.michalska@example.com',
      'krzysztof.dudek@example.com',
    ],
  },
  errors: {
    csvDuplicates: {
      count: 1,
      details: ['lukasz.ostrowski@example.com'],
    },
    databaseDuplicates: {
      count: 1,
      details: ['michal.wolinski@example.com'],
    },
    invalidEmails: {
      count: 1,
      details: ['adam.nowakexample.com'],
    },
  },
};

export const studentProfileResponseExample = {
  studentId: 'f2a1d2c3-40b5-4262-9d99-5c28aca0eeeb',
  createdAt: '2023-04-30T09:00:14.584Z',
  updatedAt: '2023-04-30T09:00:14.584Z',
  details: {
    profile: {
      firstName: 'Jan',
      lastName: 'Kowalski',
      githubUsername: 'jkowalski',
      tel: '123456789',
      email: 'jan.kowalski@example.com',
      bio: 'I am a software developer with a passion for web technologies.',
    },
    grades: {
      courseCompletion: 90,
      courseEngagement: 95,
      projectDegree: 80,
      teamProjectDegree: 85,
    },
    portfolio: {
      portfolioUrls: ['https://portfolio.example.com'],
      projectUrls: ['https://project1.example.com', 'https://project2.example.com'],
      bonusProjectUrls: ['https://bonusproject.example.com'],
    },
    employmentExpectations: {
      expectedTypeWork: 'hybrid',
      targetWorkCity: 'Warsaw',
      expectedContractType: 'uop_only',
      expectedSalary: '5000',
    },
    educationAndExperience: {
      education: 'Bachelor of Science in Computer Science',
      courses: 'Web Development, Machine Learning, Cloud Computing',
      workExperience: 'Software Developer Intern at XYZ Company',
    },
  },
};

export const getAllStudentsResponseExample = {
  students: [
    {
      id: 'a413dbc5-f91a-4500-a41f-4b46bc54e5ec',
      createdAt: '2023-05-08T16:21:24.390Z',
      grades: {
        courseCompletion: 3,
        courseEngagement: 5,
        projectDegree: 4,
        teamProjectDegree: 3,
      },
      profile: {
        expectedTypeWork: 'hybrid',
        targetWorkCity: 'San Francisco',
        expectedContractType: 'no_preference',
        expectedSalary: '5000',
        canTakeApprenticeship: true,
        monthsOfCommercialExp: 12,
      },
    },
  ],
  meta: {
    take: '1',
    itemCount: 8,
    pageCount: 8,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

export const getOneStudentResponseExample = {
  studentId: 'a413dbc5-f91a-4500-a41f-4b46bc54e5ec',
  details: {
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      githubUsername: 'johndoe',
      tel: '+1-123-456-7890',
      email: 'lukasz.ostrowski@example.com',
      bio: 'Passionate software developer with experience in various web technologies.',
    },
    grades: {
      courseCompletion: 3,
      courseEngagement: 5,
      projectDegree: 4,
      teamProjectDegree: 3,
    },
    portfolio: {
      portfolioUrls: [
        'https://student-portfolio.com/portfolio1',
        'https://student-portfolio.com/portfolio2',
      ],
      projectUrls: [
        'https://student-portfolio.com/project1',
        'https://student-portfolio.com/project2',
      ],
      bonusProjectUrls: [
        'https://github.com/annanowak/bonus1',
        'https://github.com/annanowak/bonus2',
      ],
    },
    employmentExpectations: {
      expectedTypeWork: 'hybrid',
      targetWorkCity: 'San Francisco',
      expectedContractType: 'no_preference',
      expectedSalary: '5000',
      canTakeApprenticeship: true,
      monthsOfCommercialExp: 12,
    },
    educationAndExperience: {
      education: 'Bachelor of Science in Computer Science',
      courses: 'Web Development, Machine Learning, Cloud Computing',
      workExperience: '1 year of experience as a web developer at XYZ company.',
    },
  },
};
