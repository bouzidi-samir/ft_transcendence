import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Game } from "../entities/game.entity";
import { GameService } from "../game.service";
export declare class GameFieldsResolver {
    private userService;
    private gameService;
    constructor(userService: UserService, gameService: GameService);
    player(game: Game): Promise<User>;
}
