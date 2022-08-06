import { Game } from 'src/game/entities/game.entity';
import { Repository } from 'typeorm';
import { UserCreateInput, UserCreateOutput } from './dto/user-create.dto';
import { UserDeleteOutput } from './dto/user-delete.dto';
import { UserUpdateInput, UserUpdateOutput } from './dto/user-update.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly gameRepository;
    constructor(userRepository: Repository<User>, gameRepository: Repository<Game>);
    userCreate(input: UserCreateInput): Promise<UserCreateOutput>;
    userUpdate(userId: User['id'], input: UserUpdateInput): Promise<UserUpdateOutput>;
    userGetById(id: User['id']): Promise<User>;
    userGetByEmail(email: User['email']): Promise<User>;
    userGetByName(name: User['name']): Promise<User>;
    userGetAll(): Promise<User[]>;
    userRemove(userId: User['id']): Promise<UserDeleteOutput>;
}
