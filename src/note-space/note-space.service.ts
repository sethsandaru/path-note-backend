import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {NoteSpaceEntity} from "../entities/note-space.entity";
import {Repository} from "typeorm";
import {CreateNoteSpaceDTO} from "../dto/create-note-space.dto";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class NoteSpaceService {
    constructor(
        @InjectRepository(NoteSpaceEntity)
        private noteSpaceRepository : Repository<NoteSpaceEntity>,
        private usersService : UsersService
    ) {}

    /**
     * Validate for Create-Request
     * @param createDTO
     */
    async runValidateForCreation(createDTO : CreateNoteSpaceDTO) : Promise<boolean> {
        if (!createDTO.noteKey) {
            return new Promise(resolve => resolve(true));
        }

        // we only check further unique here
        const isNoteExists = await this.isNoteKeyAvailable(createDTO.noteKey, createDTO.email)
        return !isNoteExists;
    }

    /**
     * Database Create
     * @param entity
     */
    async createFromEntity(entity: NoteSpaceEntity) : Promise<NoteSpaceEntity> {
        return this.noteSpaceRepository.create(entity)
    }

    /**
     * [WorkFlow] Create new Work Space Handler...
     */
    async createNewWorkSpace(
        createDTO : CreateNoteSpaceDTO
    ) : Promise<NoteSpaceEntity> {
        // Create NoteSpace Entity First
        let spaceEntity = NoteSpaceService.transformFromCreateNoteSpaceDTO(createDTO)

        // Mapping with User
        let userEntity = this.usersService.createOrRetrieveUser(createDTO.email)

        // TODO: Continue the function

        // result...
        return null;
    }

    /**
     * Check if noteKey + userEmail is available to create
     * @param noteKey
     * @param userEmail
     */
    async isNoteKeyAvailable(noteKey : string, userEmail : string) : Promise<boolean> {
        const totalResult = await this.noteSpaceRepository.createQueryBuilder()
            .select('space.id')
            .from(NoteSpaceEntity, 'space')
            .innerJoin(UserEntity, 'user', 'user.id = space.user_id')
            .where('space.note_key = :key', {key: noteKey})
            .andWhere('user.email = :email', {email: userEmail})
            .getCount()

        return new Promise(resolve => {
            resolve(totalResult > 0);
        });
    }

    /**
     * From Create Note Space DTO => Entity
     * @param dto
     */
    private static transformFromCreateNoteSpaceDTO(
        dto : CreateNoteSpaceDTO
    ) : NoteSpaceEntity {
        let newSpace = new NoteSpaceEntity();

        // set data
        newSpace.noteKey = dto.noteKey;

        return newSpace;
    }

}
