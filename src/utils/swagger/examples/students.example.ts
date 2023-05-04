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
