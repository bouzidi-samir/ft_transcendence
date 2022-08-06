import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { GameService } from "../../game/game.service";
export declare class UserFieldsResolver {
    private userService;
    private gameService;
    constructor(userService: UserService, gameService: GameService);
    player(user: User): Promise<User>;
}
