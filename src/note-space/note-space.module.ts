import { Module } from '@nestjs/common';
import { NoteSpaceService } from './note-space.service';
import { NoteSpaceController } from './note-space.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NoteSpaceEntity} from "@entities/note-space.entity";
import {UsersModule} from "@src/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([NoteSpaceEntity]),
        UsersModule
    ],
    providers: [
        NoteSpaceService,
    ],
    controllers: [NoteSpaceController]
})
export class NoteSpaceModule {}
