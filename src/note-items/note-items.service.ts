import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {NoteItemEntity} from "@entities/note-item.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {NoteSpaceService} from "@src/note-space/note-space.service";

@Injectable()
export class NoteItemsService {
    constructor(
        @InjectRepository(NoteItemEntity) // Main repository of this service
        private repository : Repository<NoteItemEntity>,

        // DI(s)
        private readonly noteSpaceService : NoteSpaceService
    ) {}

    /**
     * Get N note items from noteSpaceID
     */
    async getFromNoteSpaceId(noteSpaceId : number) : Promise<NoteItemEntity[]> {
        // TODO: Check permission here
        // if (this.noteSpaceService.isNoteHasPassword(noteSpaceId)) {...}

        return this.repository.find({
            where: {
                noteSpaceId: noteSpaceId
            }
        });
    }
}
