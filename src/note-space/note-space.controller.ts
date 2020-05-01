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
        const validationStatus = await this.noteService.runValidateForCreation(createSpaceDto)
        if (!validationStatus) {
            throw new BadRequestException("Note-Key is already taken. Please choose another one.")
        }

        // Business-Handling...
        const noteSpaceEntity = await this.noteService.createNewWorkSpace(createSpaceDto)
        if (!noteSpaceEntity) {
            throw new UnprocessableEntityException("Failed to create new Note-Space. Please try again.")
        }

        // Return successfully result
        return new Promise(resolve => {
            let resultObj = new RetrieveApiResultDTO()

            resultObj.status = (noteSpaceEntity != null)
            if (resultObj.status) {
                let nsObj : NoteSpaceResultInterface = {
                    id: noteSpaceEntity.id,
                    noteKey: noteSpaceEntity.noteKey
                }

                resultObj.object = nsObj
            }

            resolve(resultObj)
        })
    }
}
