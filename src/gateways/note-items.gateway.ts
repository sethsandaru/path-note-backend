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

        // back data
        client.join(data.noteSpaceId)
            .broadcast
            .to(data.noteSpaceId)
            .emit('noteSpaceJoined', {event: 'joined'});
    }

    @SubscribeMessage('create-note-item')
    async createNoteItem(client: Socket, payload : UpdateNoteItemDTO)  {
        client.server.emit('note-item-added');
    }

    @SubscribeMessage('update-note-item')
    async updateNoteItem(client: Socket, payload : UpdateNoteItemDTO)  {
        await this.noteItemsService.updateNoteItem(payload)
        client.server.emit('note-item-updated');
    }
}
