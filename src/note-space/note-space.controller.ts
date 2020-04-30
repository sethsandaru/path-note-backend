import {Body, Controller, HttpException, Post} from '@nestjs/common';
import {NoteSpaceService} from "./note-space.service";
import {CreateNoteSpaceDTO} from "../dto/create-note-space.dto";
import {NoteSpaceEntity} from "../entities/note-space.entity";
import {RetrieveApiResultDTO} from "../dto/retrieve-api-result.dto";

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
    ) : Promise<RetrieveApiResultDTO> {
        const validationStatus = await this.noteService.runValidateForCreation(createSpaceDto)
        if (!validationStatus) {
            throw new HttpException(
                "Note-Key is already taken. Please choose another one.",
                400
            )
        }

        // start the request
        const noteSpaceEntity = await this.noteService.createNewWorkSpace(createSpaceDto)
        return new Promise(resolve => {
            let resultObj = new RetrieveApiResultDTO()

            resultObj.status = (noteSpaceEntity != null)
            resultObj.object = noteSpaceEntity

            resolve(resultObj)
        })
    }
}
