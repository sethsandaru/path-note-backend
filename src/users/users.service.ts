import { Injectable } from '@nestjs/common';
import {UserEntity} from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async getUser(userId: Number) : Promise<UserEntity> {
        const user = new UserEntity();
        user.email = "sethphat@gmail.com"
        user.createdDate = new Date();

        await this.usersRepository.save(user)

        return new Promise(resolve => {
            resolve(user);
        });
    }
}
