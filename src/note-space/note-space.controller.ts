import {BadRequestException, Body, Controller, HttpCode, Post, UnprocessableEntityException} from '@nestjs/common';
import {NoteSpaceService} from "./note-space.service";
import {CreateNoteSpaceDTO} from "@dto/create-note-space.dto";
import {RetrieveApiResultDTO} from "@dto/retrieve-api-result.dto";
import {NoteSpaceResultInterface} from "@interfaces/note-space/note-space-result.interface";

@Controller('note-space')
export class NoteSpaceController {
    constructor(
        private noteService: NoteSpaceService
    ) {}

    /**
     * This method will create a new note space for the user
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
}
