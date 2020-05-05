import { Test, TestingModule } from '@nestjs/testing';
import { NoteSpaceAccessService } from './note-space-access.service';

describe('NoteSpaceAccessService', () => {
  let service: NoteSpaceAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteSpaceAccessService],
    }).compile();

    service = module.get<NoteSpaceAccessService>(NoteSpaceAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
