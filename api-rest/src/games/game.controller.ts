import { Controller, Get, Post, Inject, Param, Body, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, Res } from '@nestjs/common';
import { TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import Game from './game.entity';
import {gameService} from './game.service';
import {UsersService} from '../users/users.service';

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class gameController {
    constructor(private readonly gameService: gameService) {}
    @Inject(gameService)
	private readonly service: gameService;
	
	@Inject(UsersService)
	private readonly userService: UsersService;

   /* @Get()
	async getGames(): Promise<Game[]> {
        return await this.service.getAllGames();
    }*/

    /*@Get(":id")
	async getGameById(
		@Param('id') id: number
	): Promise<Game> {
		return await this.service.getGameById(id);
	}*/


	@Post("test")
	async test(@Body() body : any)
	{
		console.log(body.player1_username)
		return ("test success");
	}

	@Post("result")
	async gameResult(@Body() body : any)
	{
		let game = new Game;
		game.p1_userName = body.player1_username;
		game.p2_userName = body.player2_username;
		game.p1_score = parseInt(body.player1_score);
		game.p2_score = parseInt(body.player2_score);

		let player1 = await this.userService.getUserByUsername(game.p1_userName);
		let player2 = await this.userService.getUserByUsername(game.p2_userName);
		//console.log(player1);
		//console.log(player2);

		await this.userService.gamePlayedAdd(player1.id, player1.game_played + 1);
		await this.userService.gamePlayedAdd(player2.id, player2.game_played + 1);

		if (game.p1_score > game.p2_score)
		{
			game.winner = game.p1_userName;
			await this.userService.gameWonAdd(player1.id, player1.game_won + 1, player1.ello + 10);
			await this.userService.gameLostAdd(player2.id, player2.game_lost + 1, player2.ello - 10);
		}
		else 
		{
			game.winner = game.p2_userName;
			await this.userService.gameWonAdd(player2.id, player2.game_won + 1, player2.ello + 10)
			await this.userService.gameLostAdd(player1.id, player1.game_lost + 1, player1.ello - 10);
		}
		//console.log(game);
		// rajouter dans l historique des joueurs par la suite
		//console.log(game);
		return await this.service.addGame(game);
	}
}