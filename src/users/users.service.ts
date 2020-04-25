import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    getUser(userId: Number) : Promise<Object> {
        return new Promise(resolve => {
            resolve({id:userId, name:'seth phat'});
        });
    }
}
