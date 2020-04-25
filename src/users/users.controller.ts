import {Controller, Get, Param} from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}

    @Get(':userId')
    async getCourses(
        @Param('userId') userId
    ) {
        return await this.service.getUser(userId);
    }

}
