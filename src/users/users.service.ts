import { Injectable } from '@nestjs/common';
import {UserEntity} from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CreateNoteSpaceDTO} from "../dto/create-note-space.dto";
import {NoteSpaceEntity} from "../entities/note-space.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    /**
     * Get User by Email
     * @param emailAddress
     */
    async getUserByEmail(emailAddress : string) : Promise<UserEntity|null> {
        let userEntity = await this.usersRepository.findOne({
            where: {
                email: emailAddress
            }
        })

        return new Promise(resolve => {
            resolve(userEntity)
        });
    }

    /**
     * Create new user from Email
     * @param email
     */
    async createUser(email: string) : Promise<UserEntity> {
        let userEntity = new UserEntity();
        userEntity.email = email;
        userEntity.createdDate = new Date();

        return this.usersRepository.create(userEntity)
    }

    /**
     * Create or Retrieve based on Email
     * @param userEmail
     */
    async createOrRetrieveUser(
        userEmail: string
    ) : Promise<UserEntity> {
        let userEntity = await this.getUserByEmail(userEmail)

        if (!userEntity) {
            userEntity = await this.createUser(userEmail)
        }

        return new Promise(resolve => {
            resolve(userEntity)
        })
    }
}
