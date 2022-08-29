import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    users = [
     {
        id : 1,
        name : 'sam',
     }
    ];
    findAll(): any[] {
        return this.users;
    }
}
