import { JWTPayload } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { GameCreateInput, GameCreateOutput } from './dto/game-create.dto';
import { GameDeleteOutput } from './dto/game-delete.dto';
import { Game } from './entities/game.entity';
export declare class GameService {
    private readonly gameRepository;
    private readonly userRepository;
    constructor(gameRepository: Repository<Game>, userRepository: Repository<User>);
    gameCreate(user: JWTPayload, input: GameCreateInput): Promise<GameCreateOutput>;
    gameDelete(gameId: Game['id']): Promise<GameDeleteOutput>;
    gameList(): Promise<Game[]>;
    gameById(id: User['id']): Promise<Game>;
    gameByPlayerId(playerId: Game['playerId']): Promise<Game[]>;
}
