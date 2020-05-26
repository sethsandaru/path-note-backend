import {BadRequestException, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {NoteItemEntity} from "@entities/note-item.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {NoteSpaceService} from "@src/note-space/note-space.service";
import {UpdateNoteItemDTO} from "@dto/update-note-item.dto";
import {UpdateItemResultInterface} from "@interfaces/note-items/update-item-result.interface";
import {Config} from "@src/configs";
import CreateNoteItemDTO from "@dto/create-note-item.dto";

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
                id: noteItemId,
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
                "noteSpaceId",
                "headline",
                "content",
                "isRichContent",
                "top",
                "left",
                "width",
                "height",
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
     * Add new Blank Note Item from NoteSpaceID
     */
    async addNewBlankNoteItem(
        noteSpaceId : number
    ) : Promise<NoteItemEntity> {
        const item = new NoteItemEntity();
        item.noteSpaceId = noteSpaceId

        // DEFAULT DATA
        item.headline = Config.getLangText('noteItem.defaultHeadline')
        item.content = Config.getLangText('noteItem.defaultContent')
        item.width = 250
        item.height = 150
        item.color = 0

        await this.repository.save(item)
        return this.getById(item.id)
    }

    /**
     * Add Note-Item based on Data from FrontEnd
     * @param data
     */
    addNote(
        data : CreateNoteItemDTO
    ) : Promise<NoteItemEntity> {
        const item = new NoteItemEntity();

        // assigning data
        item.noteSpaceId = data.noteSpaceId
        item.headline = data.headline
        item.content = data.content
        item.width = data.width
        item.height = data.height
        item.color = data.color

        return this.repository.save(item)
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
        noteItem.headline = updateNoteItemDTO.headline ?? noteItem.headline
        noteItem.content = updateNoteItemDTO.content ?? noteItem.content
        noteItem.top = updateNoteItemDTO.top ?? noteItem.top
        noteItem.left = updateNoteItemDTO.left ?? noteItem.left
        noteItem.width = updateNoteItemDTO.width ?? noteItem.width
        noteItem.height = updateNoteItemDTO.height ?? noteItem.height
        noteItem.updatedDate = new Date();

        // prepare result
        let resultObj : UpdateItemResultInterface;

        try {
            await this.repository.update({id: noteItem.id}, noteItem)

            resultObj = {
                status: true,
                updatedData: updateNoteItemDTO
            }
        } catch (e) {
            resultObj = {
                status: false,
                updatedData: e
            }
        }

        return new Promise(r => r(resultObj))
    }

    async deleteNoteItem(id : number) {
        const noteItem = await this.getById(id)
        if (!noteItem) {
            throw new BadRequestException(
                Config.getLangText('noteItem.errorMessages.notExists')
            )
        }

        // soft-delete
        noteItem.deletedDate = new Date();

        return this.repository.save(noteItem)
    }
}
