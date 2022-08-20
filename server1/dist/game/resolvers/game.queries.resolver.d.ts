import { Game } from "../entities/game.entity";
import { GameService } from "../game.service";
export declare class GameQueriesResolver {
    private readonly gameService;
    constructor(gameService: GameService);
    gameList(): Promise<Game[]>;
    gameById(id: string): Promise<Game>;
    gameByPlayerId(playerId: Game['playerId']): Promise<Game>;
}
