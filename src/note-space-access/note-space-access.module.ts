import {Module} from '@nestjs/common';
import {NoteSpaceAccessService} from './note-space-access.service';
import {NoteSpaceAccessController} from './note-space-access.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NoteSpaceAccessEntity} from "@entities/note-space-access.entity";

@Module({
    imports: [TypeOrmModule.forFeature([NoteSpaceAccessEntity])],
    providers: [NoteSpaceAccessService],
    controllers: [NoteSpaceAccessController],
    exports: [
        NoteSpaceAccessService
    ]
})
export class NoteSpaceAccessModule {
}
