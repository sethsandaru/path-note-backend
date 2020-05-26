import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {UpdateNoteItemDTO} from "@dto/update-note-item.dto";
import {NoteItemsService} from "@src/note-items/note-items.service";
import CreateNoteItemDTO from "@dto/create-note-item.dto";
import {NoteItemEntity} from "@entities/note-item.entity";

@WebSocketGateway()
export class NoteItemsGateway {
    constructor(
        private readonly noteItemsService : NoteItemsService
    ) {}

    @SubscribeMessage('enter-note-space')
    async enterNoteSpace(client: Socket, data: { noteSpaceId: number }) {
        // check permission

        console.log("enter-note-space - ID:", data.noteSpaceId.toString(), new Date());

        let listItems = await this.noteItemsService.getFromNoteSpaceId(data.noteSpaceId)

        // back data
        client.join(data.noteSpaceId.toString())
            .emit('noteSpaceJoined', {
                noteSpaceId: data.noteSpaceId,
                event: 'joined',
                noteItems: listItems
            });
    }

    @SubscribeMessage('leave-note-space')
    async leaveNoteSpace(client: Socket, data: { noteSpaceId: number }) {
        client.leave(data.noteSpaceId.toString())
            .emit('noteSpaceJoined', {
                event: 'left'
            });
    }

    @SubscribeMessage('create-note-item')
    async createNoteItem(client: Socket, payload: CreateNoteItemDTO) {
        const result = {status: true, data: null};

        try {
            result.data = await this.noteItemsService.addNote(payload)
        } catch (e) {
            result.status = false;
            result.data = e;
        }

        client.broadcast
            .to(payload.noteSpaceId.toString())
            .emit('noteItemAdded', result);
    }

    @SubscribeMessage('created-blank-note-item')
    async createdBlankNoteNotify(client: Socket, payload: NoteItemEntity) {
        client.broadcast
            .to(payload.noteSpaceId.toString())
            .emit('noteItemAddedAPI', payload);
    }

    @SubscribeMessage('update-note-item')
    async updateNoteItem(client: Socket, payload : UpdateNoteItemDTO)  {
        let updatedDataInfo = await this.noteItemsService.updateNoteItem(payload)
        client.broadcast
            .to(payload.noteSpaceId.toString())
            .emit('noteItemUpdated', updatedDataInfo);
    }

    @SubscribeMessage('delete-note-item')
    async deleteNoteItem(client: Socket, payload : { noteSpaceId : number, id : number }) {
        await this.noteItemsService.deleteNoteItem(payload.id)

        client.broadcast
            .to(payload.noteSpaceId.toString())
            .emit('noteItemDeleted', {
                event: 'deleted-note',
                id: payload.id
            });
    }

}
