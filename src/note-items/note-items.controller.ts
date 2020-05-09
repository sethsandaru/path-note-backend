import {Controller, Get, HttpCode, Param} from '@nestjs/common';
import {NoteItemsService} from "@src/note-items/note-items.service";
import {NoteItemEntity} from "@entities/note-item.entity";

@Controller('note-items')
export class NoteItemsController {
    constructor(
        private service : NoteItemsService
    ) {}

    /**
     * Get Items From Note Space ID
     */
    @Get('/list/:noteSpaceId')
    @HttpCode(200)
    async getFromNoteSpaceId(
        @Param('noteSpaceId') noteSpaceId : number
    ) : Promise<NoteItemEntity[]> {
        return this.service.getFromNoteSpaceId(noteSpaceId)
    }
}
