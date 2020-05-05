import { Test, TestingModule } from '@nestjs/testing';
import { NoteSpaceAccessController } from './note-space-access.controller';

describe('NoteSpaceAccess Controller', () => {
  let controller: NoteSpaceAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteSpaceAccessController],
    }).compile();

    controller = module.get<NoteSpaceAccessController>(NoteSpaceAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
