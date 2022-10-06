import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relations } from 'src/users/entities/relations.entity';
import User from '../users/entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import Game from './entities/game.entity';
import { Player } from './entities/player.entity';

@Injectable()
export class gameService {
    constructor(
		@InjectRepository(Game)
		public gameRepository: Repository<Game>,
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
        @InjectRepository(Relations)
        private readonly relationsRepository: Repository<Relations>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
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

    async setP1Score(gameId: number, score: number) { //save le secret dans la db
        return this.gameRepository.update(gameId, {
          p1_score: score
        });
      }

    async setP2Score(gameId: number, score: number) { //save le secret dans la db
        return this.gameRepository.update(gameId, {
          p2_score: score
        });
      }

      // async gameInvitation(body) {

      //   const sender = await this.userRepository.findOne({where: {username: body.senderName}});
      //   if (!sender)
      //     return false;
      //   const receiver = await this.userRepository.findOne({where: {username: body.receiverName}});
      //   if (!receiver)
      //     return false;
    
    
      //   const relation = await this.relationsRepository.findOne({where: {fromUsername: body.senderName, toUsername: body.receiverName}})
      //   if (relation){
      //     if (relation.gameRequest == false) {
      //       relation.gameRequest = true;
      //       // relation.gameId = body.gameId;
      //       await this.relationsRepository.save(relation);
      //       return relation;
      //     }
      //   }
      //   else {
    
      //     const newRelation = await this.relationsRepository.create();
      //     newRelation.fromUsername = body.senderName;
      //     newRelation.toUsername = body.receiverName;
      //     newRelation.gameRequest = true;
      //   //   newRelation.gameId = body.gameId;
      //     newRelation.owner = receiver;
      //     await this.relationsRepository.save(newRelation);
      //     return newRelation;
      //   }
      // }


      // async createGame(body) {

      //   const check = await this.gameRepository.findOne({where: { id:body.id }});
      //   if (check)
      //     return false;
    
      //   const user = await this.userRepository.findOne({where: { username: body.username}});
      //   if (!user)
      //     return false;
    
      //   const game = await this.gameRepository.create();
      //   const player1 = await this.playerRepository.create();
    
      //   player1.username = user.username;
      //   player1.userId = user.id;
      //   player1.game = game;

      //   game.p1_userName = user.username;
        
      //   await this.gameRepository.save(game);
      //   await this.playerRepository.save(player1);
    
      //   return {game, player1};
      // }
}