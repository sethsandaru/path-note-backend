import {SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {UpdateNoteItemDTO} from "@dto/update-note-item.dto";
import {NoteItemsService} from "@src/note-items/note-items.service";

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

    @SubscribeMessage('create-note-item')
    async createNoteItem(client: Socket, payload: { noteSpaceId: number }) {
        const result = {status: true, data: null};
        try {
            result.data = await this.noteItemsService.addNewBlankNoteItem(payload.noteSpaceId)
        } catch (e) {
            result.status = false;
            result.data = e;
        }

        client.join(payload.noteSpaceId.toString())
            .emit('noteItemAdded', result);
    }

    @SubscribeMessage('update-note-item')
    async updateNoteItem(client: Socket, payload : UpdateNoteItemDTO)  {
        let updatedDataInfo = await this.noteItemsService.updateNoteItem(payload)
        client.join(payload.noteSpaceId.toString())
            .emit('noteItemUpdated', updatedDataInfo);
    }
}
