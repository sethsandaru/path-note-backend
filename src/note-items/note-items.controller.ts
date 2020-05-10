import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
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

    @Post('/create')
    @HttpCode(200)
    async createNoteItem(
        @Body() hello : string //TODO: Switch to DTO
    ) {

    }

    @Put('/update/:noteItemId')
    async updateNoteItem(
        @Param('noteItemId') noteItemId : number,
        @Body() hello : string // TODO: Switch to DTO
    ) {

    }

    @Delete('/update/:noteItemId')
    @HttpCode(200)
    async deleteNoteItem(
        @Param('noteItemId') noteItemId : number
    ) {

    }
}
