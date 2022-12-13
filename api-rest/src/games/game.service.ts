import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import Games from './entities/game.entity';

@Injectable()
export class gameService {
    constructor(
		@InjectRepository(Games)
		public gameRepository: Repository<Games>,
	) {}

    getAllGames(): Promise<Games[]> {
        return this.gameRepository.find() // SELECT * from user
    }

    async getGameById(id: number): Promise<Games>
    {
        
        const user = await this.gameRepository.findOne({where: {id: id}});
        return user;      
    }    

    async addGame(game: Games): Promise<Games> {
		  const addedGame = this.gameRepository.create(game);
		  await this.gameRepository.save(addedGame);
		  return addedGame;
	  }

    async setP1Id(gameId: number, Id: number) { //save le secret dans la db
      //get nick name  
      return this.gameRepository.update(gameId, {
          p1_id: Id
        });
      }

    async setP2Id(gameId: number, Id: number) { //save le secret dans la db
        return this.gameRepository.update(gameId, {
          p2_id: Id
        });
      }
}