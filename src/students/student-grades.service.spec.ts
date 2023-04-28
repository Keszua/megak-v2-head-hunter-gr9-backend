import { Test, TestingModule } from '@nestjs/testing';

import { StudentGradesService } from './student-grades.service';

describe('StudentGradesService', () => {
  let service: StudentGradesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentGradesService],
    }).compile();

    service = module.get<StudentGradesService>(StudentGradesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
