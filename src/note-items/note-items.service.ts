import {BadRequestException, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {NoteItemEntity} from "@entities/note-item.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {NoteSpaceService} from "@src/note-space/note-space.service";
import {UpdateNoteItemDTO} from "@dto/update-note-item.dto";
import {UpdateItemResultInterface} from "@interfaces/note-items/update-item-result.interface";
import {Config} from "@src/configs";

@Injectable()
export class NoteItemsService {
    constructor(
        @InjectRepository(NoteItemEntity) // Main repository of this service
        private repository : Repository<NoteItemEntity>,

        // DI(s)
        private readonly noteSpaceService : NoteSpaceService
    ) {}

    /**
     * Single Select - Get by ID
     * @param noteItemId
     */
    async getById(noteItemId : number) : Promise<NoteItemEntity | undefined> {
        return this.repository.findOne({
            where: {
                id: noteItemId
            }
        })
    }

    /**
     * Get N note items from noteSpaceID
     */
    async getFromNoteSpaceId(noteSpaceId : number) : Promise<NoteItemEntity[]> {
        // TODO: Check permission here
        // if (this.noteSpaceService.isNoteHasPassword(noteSpaceId)) {...}

        return this.repository.find({
            select: [
                "id",
                "headline",
                "content",
                "isRichContent",
                "top",
                "left",
                "createdDate",
                "updatedDate",
                "color"
            ],
            where: {
                noteSpaceId: noteSpaceId,
                deletedDate: null
            },
            relations: null
        });
    }

    /**
     * Update Note Item
     * @desc Only update fields which aren't null in the DTO.
     * @param {number} noteItemId
     * @param {UpdateNoteItemDTO} updateNoteItemDTO
     */
    async updateNoteItem(
        updateNoteItemDTO : UpdateNoteItemDTO,
        noteItemId : number = null
    ) : Promise<UpdateItemResultInterface> {
        const noteItem = await this.getById(noteItemId ?? updateNoteItemDTO.id)
        if (!noteItem) {
            throw new BadRequestException(
                Config.getLangText('noteItem.errorMessages.notExists')
            )
        }

        // update which??
        if (updateNoteItemDTO.headline) {
            noteItem.headline = updateNoteItemDTO.headline
        }

        if (updateNoteItemDTO.content) {
            noteItem.content = updateNoteItemDTO.content
        }

        if (updateNoteItemDTO.top) {
            noteItem.top = updateNoteItemDTO.top
        }

        if (updateNoteItemDTO.left) {
            noteItem.left = updateNoteItemDTO.left
        }

        if (updateNoteItemDTO.width) {
            noteItem.width = updateNoteItemDTO.width
        }

        if (updateNoteItemDTO.height) {
            noteItem.height = updateNoteItemDTO.height
        }

        // set update date
        noteItem.updatedDate = new Date();

        // prepare result
        let resultObj : UpdateItemResultInterface;

        try {
            await this.repository.save(noteItem)

            resultObj = {
                status: true,
                updatedData: updateNoteItemDTO
            }
        } catch (e) {
            resultObj = {
                status: false,
                updatedData: null
            }
        }

        return new Promise(r => r(resultObj))
    }
}
