import { UserCreateInput, UserCreateOutput } from '../dto/user-create.dto';
import { UserDeleteOutput } from '../dto/user-delete.dto';
import { UserUpdateInput, UserUpdateOutput } from '../dto/user-update.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
export declare class UserMutationsResolver {
    private readonly userService;
    constructor(userService: UserService);
    userCreate(input: UserCreateInput): Promise<UserCreateOutput>;
    userUpdate(userId: User['id'], input: UserUpdateInput): Promise<UserUpdateOutput>;
    userRemove(userId: User['id']): Promise<UserDeleteOutput>;
}
