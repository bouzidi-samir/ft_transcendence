import { User } from "../entities/user.entity";
import { UserService } from "../user.service";
export declare class UserQueriesResolver {
    private readonly userService;
    constructor(userService: UserService);
    userGetById(id: string): Promise<User>;
    userGetByEmail(email: string): Promise<User>;
    userGetByName(name: string): Promise<User>;
    userGetAll(): Promise<User[]>;
}
