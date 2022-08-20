import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWTPayload } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { GameCreateInput, GameCreateOutput } from './dto/game-create.dto';
import { GameDeleteOutput } from './dto/game-delete.dto';
import { Game } from './entities/game.entity';


@Injectable()
export class GameService {

    constructor(
      @InjectRepository(Game)
      private readonly gameRepository: Repository<Game>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      ) {}

      
    async gameCreate(
      user: JWTPayload,
      input: GameCreateInput): Promise<GameCreateOutput> {
        const game = this.gameRepository.create(input);
        game.user = new User();
        game.user.id = user.id;
        await game.save();
        return { game };
    }

    async gameDelete( gameId: Game['id'],): Promise<GameDeleteOutput> {

        const game = await this.gameRepository.findOneOrFail(gameId);
        await game.remove();
        return { gameId };
    }
    
    // async gameById(gameId: Game['id']): Promise<Game> {
    //     return this.gameRepository.findOneOrFail(gameId);
    // }

    async gameList(): Promise<Game[]> {
      return this.gameRepository.find();
    }

    async gameById(id: User['id']): Promise<Game> {
      return await this.gameRepository.findOneOrFail({id});
    }

    async gameByPlayerId(playerId: Game['playerId']): Promise<Game[]> {
      return this.gameRepository.find();

    }

}

