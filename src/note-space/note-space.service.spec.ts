import { Test, TestingModule } from '@nestjs/testing';
import { NoteSpaceService } from './note-space.service';

describe('NoteSpaceService', () => {
  let service: NoteSpaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteSpaceService],
    }).compile();

    service = module.get<NoteSpaceService>(NoteSpaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
