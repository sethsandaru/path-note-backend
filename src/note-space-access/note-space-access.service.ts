import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {NoteSpaceAccessEntity} from "@entities/note-space-access.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class NoteSpaceAccessService {
    constructor(
        @InjectRepository(NoteSpaceAccessEntity)
        private repository : Repository<NoteSpaceAccessEntity>
    ) {}


    async createApiKeyForVisitor() {
        // TODO: Finish this method
    }
}
