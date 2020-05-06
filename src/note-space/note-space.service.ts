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
import {NoteSpacePermissionResultInterface} from "@interfaces/note-space/note-space-permission-result.interface";
import {NoteSpacePasswordDTO} from "@dto/note-space-password.dto";
import {NoteSpaceAccessService} from "@src/note-space-access/note-space-access.service";

@Injectable()
export class NoteSpaceService {
    constructor(
        // repo DI
        @InjectRepository(NoteSpaceEntity)
        private noteSpaceRepository : Repository<NoteSpaceEntity>,

        // service(s) DI
        private readonly usersService : UsersService,
        private readonly noteSpaceAccessService : NoteSpaceAccessService
    ) {}

    /**
     * Validate for Create-Request
     * @param createDTO
     */
    private async runValidateForCreation(createDTO : CreateNoteSpaceDTO) : Promise<boolean> {
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
        return this.noteSpaceRepository.save(entity)
    }

    /**
     * Database Retrieve by Note-Key
     * @description Where on Note-Key (INDEX)
     * @param noteKey
     */
    async getByNoteKey(noteKey : string) : Promise<NoteSpaceEntity>  {
        return this.noteSpaceRepository.findOne({
            where: {
                noteKey: noteKey
            }
        })
    }

    /**
     * Database Retrieve by Note-Space-ID
     * @description Where on ID (PRIMARy)
     * @param noteSpaceId
     */
    async getById(noteSpaceId : number) : Promise<NoteSpaceEntity>  {
        return this.noteSpaceRepository.findOne({
            where: {
                id: noteSpaceId
            }
        })
    }

    /**
     * [WorkFlow] Create new Work Space Handler...
     */
    async createNewWorkSpace(
        createDTO : CreateNoteSpaceDTO
    ) : Promise<RetrieveApiResultDTO> {
        // Run validation (noteKey uniqueChecking...)
        await this.runValidateForCreation(createDTO)

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
            spaceEntity = await this.createFromEntity(spaceEntity)

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
     * Create-Note-DTO Transform into NoteSpaceEntity
     * @returns NoteSpaceEntity
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

    /**
     * Check if visitor have access to the note
     * @param noteKey
     */
    async checkNoteSpacePermission(noteKey : string ) : Promise<RetrieveApiResultDTO> {
        // get note info
        const noteSpaceEntity = await this.getByNoteKey(noteKey)
        if (!noteSpaceEntity) {
            throw new BadRequestException(
                Config.getLangText('noteSpace.errorMessages.noteSpaceNotExists')
            )
        }

        // pick up some basic data for permission
        let resultDataObject : NoteSpacePermissionResultInterface = {
            id: noteSpaceEntity.id,
            noteKey: noteSpaceEntity.noteKey,
            name: noteSpaceEntity.name,
            hasPassword: noteSpaceEntity.password != null,
            visitorCanEdit: noteSpaceEntity.visitorCanEdit,
            visitorCanView: noteSpaceEntity.visitorCanView
        }

        // return result to client
        return new Promise(resolve =>
            resolve(
                new RetrieveApiResultDTO(true, resultDataObject)
            )
        )
    }

    /**
     * Verify Password In order to access Note-Space
     * @param passwordDTO
     */
    async verifyNoteSpacePassword(passwordDTO : NoteSpacePasswordDTO) : Promise<RetrieveApiResultDTO> {
        // retrieve note space first
        const noteSpaceItem = await this.getByNoteKey(passwordDTO.noteKey)
        if (!noteSpaceItem) {
            throw new BadRequestException(
                Config.getLangText('noteSpace.errorMessages.noteSpaceNotExists')
            )
        }

        // check password and return data here
        let passwordStatus = await HelperFactory.comparePassword(passwordDTO.password, noteSpaceItem.password)

        // we have to generate a new API-key to use in order to access the note.

        return new Promise(resolve =>
            resolve(
                new RetrieveApiResultDTO(passwordStatus)
            )
        )
    }

    /**
     * Check if the note-space has password or not
     * @param noteSpaceId
     */
    async isNoteSpaceHasPassword(noteSpaceId : number) : Promise<boolean> {
        const noteSpaceEntity = await this.getById(noteSpaceId)
        return new Promise(resolve => resolve(noteSpaceEntity.hasPassword))
    }
}
