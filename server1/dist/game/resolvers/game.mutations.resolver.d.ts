import { GameCreateInput, GameCreateOutput } from "../dto/game-create.dto";
import { GameDeleteOutput } from "../dto/game-delete.dto";
import { Game } from "../entities/game.entity";
import { GameService } from "../game.service";
import { JWTPayload } from 'src/auth/auth.service';
export declare class GameMutationsResolver {
    private readonly gameService;
    constructor(gameService: GameService);
    gameCreate(user: JWTPayload, input: GameCreateInput): Promise<GameCreateOutput>;
    gameDelete(gameId: Game['id']): Promise<GameDeleteOutput>;
}
