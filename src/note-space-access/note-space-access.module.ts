import { Module } from '@nestjs/common';
import { NoteSpaceAccessService } from './note-space-access.service';
import { NoteSpaceAccessController } from './note-space-access.controller';

@Module({
  providers: [NoteSpaceAccessService],
  controllers: [NoteSpaceAccessController]
})
export class NoteSpaceAccessModule {}
