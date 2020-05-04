import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Post
} from '@nestjs/common';
import {NoteSpaceService} from "./note-space.service";
import {CreateNoteSpaceDTO} from "@dto/create-note-space.dto";
import {RetrieveApiResultDTO} from "@dto/retrieve-api-result.dto";
import {NoteSpacePasswordDTO} from "@dto/note-space-password.dto";

@Controller('note-space')
export class NoteSpaceController {
    constructor(
        private noteService: NoteSpaceService
    ) {}

    /**
     * This method will create a new note space for the user
     * [POST] only
     */
    @Post('/create')
    @HttpCode(200)
    async createNoteSpace(
        @Body() createSpaceDto : CreateNoteSpaceDTO
    ) : Promise<RetrieveApiResultDTO> {
        // Business-Handle and Return Result
        // If it got some problem => exception will be fired
        return this.noteService.createNewWorkSpace(createSpaceDto)
    }

    /**
     * This method will check the availabilty - also the permission of the user in order to continue
     * [GET]
     */
    @Get('/availability/:noteKey')
    @HttpCode(200)
    async getNoteSpaceAvailability(
        @Param('noteKey') noteKey : string
    ) : Promise<RetrieveApiResultDTO> {
        return this.noteService.checkNoteSpacePermission(noteKey)
    }

    /**
     * Verify Password of Note-Space
     * [POST]
     * @param passwordData
     */
    @Post('/verify-password')
    @HttpCode(200)
    async verifyNoteSpacePassword(
        @Body() passwordData : NoteSpacePasswordDTO
    ) : Promise<RetrieveApiResultDTO> {
        return this.noteService.verifyNoteSpacePassword(passwordData)
    }
}
