import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import Game from './game.entity';

@Injectable()
export class gameService {
    constructor(
		@InjectRepository(Game)
		public gameRepository: Repository<Game>,
	) {}

    getAllGames(): Promise<Game[]> {
        return this.gameRepository.find() // SELECT * from user
    }

    async getGameById(id: number): Promise<Game>
    {
        
        const user = await this.gameRepository.findOne({where: {id: id}});
        return user;      
    }    

    async addGame(game: Game): Promise<Game> {
		  const addedGame = this.gameRepository.create(game);
		  await this.gameRepository.save(addedGame);
		  return addedGame;
	  }

    async setP1Name(gameId: number, name: string) { //save le secret dans la db
        return this.gameRepository.update(gameId, {
          p1_userName: name
        });
      }

    async setP2Name(gameId: number, name: string) { //save le secret dans la db
        return this.gameRepository.update(gameId, {
          p2_userName: name
        });
      }
}