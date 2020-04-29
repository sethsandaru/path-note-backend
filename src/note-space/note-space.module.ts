import { Module } from '@nestjs/common';
import { NoteSpaceService } from './note-space.service';
import { NoteSpaceController } from './note-space.controller';

@Module({
  providers: [NoteSpaceService],
  controllers: [NoteSpaceController]
})
export class NoteSpaceModule {}
