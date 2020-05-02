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
        // Validation-Second-time
        await this.noteService.runValidateForCreation(createSpaceDto)

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
    getNoteSpaceAvailability(
        @Param('noteKey') noteKey : string
    ) : string {
        return ""
    }
}
