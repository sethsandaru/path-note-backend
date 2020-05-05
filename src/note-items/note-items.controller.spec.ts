import { Test, TestingModule } from '@nestjs/testing';
import { NoteItemsController } from './note-items.controller';

describe('NoteItems Controller', () => {
  let controller: NoteItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteItemsController],
    }).compile();

    controller = module.get<NoteItemsController>(NoteItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
