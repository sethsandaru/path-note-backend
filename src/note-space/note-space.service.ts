import {BadRequestException, Injectable, UnprocessableEntityException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {NoteSpaceEntity} from "@entities/note-space.entity";
import {getConnection, Repository} from "typeorm";
import {CreateNoteSpaceDTO} from "@dto/create-note-space.dto";
import {UsersService} from "@src/users/users.service";
import {UserEntity} from "@entities/user.entity";
import {HelperFactory} from "@src/helper.factory";
import {Config} from "@src/configs";
import {RetrieveApiResultDTO} from "@dto/retrieve-api-result.dto";
import {NoteSpaceResultInterface} from "@interfaces/note-space/note-space-result.interface";

@Injectable()
export class NoteSpaceService {
    constructor(
        @InjectRepository(NoteSpaceEntity)
        private noteSpaceRepository : Repository<NoteSpaceEntity>,
        private readonly usersService : UsersService
    ) {
    }

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
        if (isNoteExists) {
            throw new BadRequestException(
                Config.getLangText('noteSpace.errorMessages.duplicateNoteKey')
            )
        }

        return new Promise(resolve => resolve(true));
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
    ) : Promise<RetrieveApiResultDTO> {
        // Start Transaction indeed
        const connection = getConnection()
        const queryRunner = connection.createQueryRunner()
        await queryRunner.startTransaction()
        
        try {
            // Create Note-Space Entity
            let spaceEntity = await this.transformFromCreateNoteSpaceDTO(createDTO)

            // Get User / Create new User
            let userEntity = await this.usersService.createOrRetrieveUser(createDTO.email)

            // Set noteMapping
            spaceEntity.userId = userEntity.id

            // start to save
            spaceEntity = await this.noteSpaceRepository.save(spaceEntity)

            // Commit
            await queryRunner.commitTransaction()

            // Pack up result then return
            return new Promise(resolve => resolve(new RetrieveApiResultDTO(
                true,
                {
                    id: spaceEntity.id,
                    noteKey: spaceEntity.noteKey
                }
            )))
        } catch (err) {
            await queryRunner.rollbackTransaction()
        } finally {
            await queryRunner.release()
        }

        // Failed result...
        throw new UnprocessableEntityException(
            Config.getLangText('noteSpace.errorMessages.noteSpaceCreateFailed')
        )
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
     * Generate UNIQUE NoteKey
     * @param userEmail
     */
    async generateUniqueNoteKey(userEmail : string) : Promise<string> {
        do {
            let noteKey = HelperFactory.generateString(6)

            // if exists => next
            if (await this.isNoteKeyAvailable(noteKey, userEmail)) {
                continue
            }

            // otherwise it done
            return new Promise(resolve => resolve(noteKey))
        } while (true)
    }

    /**
     * From Create Note Space DTO => Entity
     * @param dto
     */
    private async transformFromCreateNoteSpaceDTO(
        dto : CreateNoteSpaceDTO
    ) : Promise<NoteSpaceEntity> {
        let newSpace = new NoteSpaceEntity()

        // set data
        newSpace.noteKey = dto.noteKey || await this.generateUniqueNoteKey(dto.email)
        newSpace.name = dto.name
        newSpace.description = dto.description
        newSpace.hasPassword = dto.hasPassword
        newSpace.visitorCanEdit = dto.visitorCanEdit
        newSpace.visitorCanView = dto.visitorCanView

        // some with logic
        if (newSpace.hasPassword) {
            newSpace.password = await HelperFactory.encryptPassword(dto.password)
        }

        return new Promise(resolve => resolve(newSpace))
    }

}
