import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from './users.controller';
import {UsersService} from "@src/users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "@entities/user.entity";

describe('Users Controller', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(),
                TypeOrmModule.forFeature([UserEntity])
            ],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
