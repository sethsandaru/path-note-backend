import {Module} from '@nestjs/common';
import {NoteItemsController} from './note-items.controller';
import {NoteItemsService} from './note-items.service';
import {NoteSpaceModule} from "@src/note-space/note-space.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {NoteItemEntity} from "@entities/note-item.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([NoteItemEntity]),
        NoteSpaceModule
    ],
    controllers: [NoteItemsController],
    providers: [NoteItemsService]
})
export class NoteItemsModule {
}
