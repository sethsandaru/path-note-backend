import { Module } from '@nestjs/common';
import { NoteItemsController } from './note-items.controller';
import { NoteItemsService } from './note-items.service';

@Module({
  controllers: [NoteItemsController],
  providers: [NoteItemsService]
})
export class NoteItemsModule {}
