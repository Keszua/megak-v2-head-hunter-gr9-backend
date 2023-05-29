import { Test, TestingModule } from '@nestjs/testing';

import { StudentsProfilesService } from './students-profiles.service';

describe('StudentsProfilesService', () => {
  let service: StudentsProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsProfilesService],
    }).compile();

    service = module.get<StudentsProfilesService>(StudentsProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
