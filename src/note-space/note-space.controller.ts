import {Body, Controller, HttpException, Post} from '@nestjs/common';
import {NoteSpaceService} from "./note-space.service";
import {CreateNoteSpaceDTO} from "../dto/create-note-space.dto";
import {NoteSpaceEntity} from "../entities/note-space.entity";

@Controller('note-space')
export class NoteSpaceController {
    constructor(
        private noteService: NoteSpaceService
    ) {}

    /**
     * This method will create a new note space for the user
     */
    @Post('/create')
    async createNoteSpace(
        @Body() createSpaceDto : CreateNoteSpaceDTO
    ) : Promise<NoteSpaceEntity> {
        const validationStatus = await this.noteService.runValidateForCreation(createSpaceDto)
        if (!validationStatus) {
            throw new HttpException(
                "Note-Key is already taken. Please choose another one.",
                400
            )
        }

        // start the request
        return this.noteService.createNewWorkSpace(createSpaceDto)
    }
}
