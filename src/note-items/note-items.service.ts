import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {NoteItemEntity} from "@entities/note-item.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class NoteItemsService {
    constructor(
        @InjectRepository(NoteItemEntity) // Main repository of this service
        private repository : Repository<NoteItemEntity>
    ) {}

    /**
     * Get N note items from noteSpaceID
     */
    async getFromNoteSpaceId(noteSpaceId : number) : Promise<NoteItemEntity[]> {
        return this.repository.find({
            where: {
                noteSpaceId: noteSpaceId
            }
        });
    }
}
