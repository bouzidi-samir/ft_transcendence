import { User } from "src/user/entities/user.entity";
import { Game } from "../entities/game.entity";
export declare class GameCreateInput {
    score: number;
    win: boolean;
    loss: boolean;
    user: User;
}
export declare class GameCreateOutput {
    game: Game;
}
