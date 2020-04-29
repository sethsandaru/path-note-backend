import { Test, TestingModule } from '@nestjs/testing';
import { NoteSpaceController } from './note-space.controller';

describe('NoteSpace Controller', () => {
  let controller: NoteSpaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteSpaceController],
    }).compile();

    controller = module.get<NoteSpaceController>(NoteSpaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
