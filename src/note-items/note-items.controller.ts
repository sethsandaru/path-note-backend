import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {NoteItemsService} from "@src/note-items/note-items.service";
import {NoteItemEntity} from "@entities/note-item.entity";
import {UpdateNoteItemDTO} from "@dto/update-note-item.dto";
import {UpdateItemResultInterface} from "@interfaces/note-items/update-item-result.interface";

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
    @HttpCode(200)
    async updateNoteItem(
        @Param('noteItemId') noteItemId : number,
        @Body() updateDTO : UpdateNoteItemDTO
    ) : Promise<UpdateItemResultInterface> {
        return this.service.updateNoteItem(updateDTO, noteItemId)
    }

    @Delete('/update/:noteItemId')
    @HttpCode(200)
    async deleteNoteItem(
        @Param('noteItemId') noteItemId : number
    ) {

    }
}
