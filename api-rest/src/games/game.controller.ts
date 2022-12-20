import { Controller, Get, Post, Inject, Param, Body, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, Res, UseGuards } from '@nestjs/common';
import { TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import Games from './entities/game.entity';
import {gameService} from './game.service';
import {UsersService} from '../users/users.service';
import JwtTwoFactorGuard, { JwtAuthGuard } from "src/auth/jwt-authguards";

@Controller('games')
@UseInterceptors(ClassSerializerInterceptor)
export class gameController {
    constructor(private readonly gameService: gameService) {}
    @Inject(gameService)
	private readonly service: gameService;
	
	@Inject(UsersService)
	private readonly userService: UsersService;

	@UseGuards(JwtTwoFactorGuard)
	@Get("history")
	async getHistory()
	{
		const game = await this.gameService.getAllGames();
		return JSON.stringify({
			games : game,
		});
	}

	@UseGuards(JwtTwoFactorGuard)
	@Post("checkGuard")
	async checkGuard()
	{
		return (true);
	}

	@UseGuards(JwtTwoFactorGuard)
	@Post("result")
	async gameResult(@Body() body : any)
	{
		let game = new Games;
		game.p1_score = parseInt(body.player1_score);
		game.p2_score = parseInt(body.player2_score);

		let player1 = await this.userService.getUserByUsername(body.player1_username);
		let player2 = await this.userService.getUserByUsername(body.player2_username);
		game.p1_id = player1.id;
		game.p2_id = player2.id;
		game.p1_nick = player1.nickname;
		game.p2_nick = player2.nickname;
		//console.log(player1);
		//console.log(player2);

		await this.userService.gamePlayedAdd(player1.id, player1.game_played + 1);
		await this.userService.gamePlayedAdd(player2.id, player2.game_played + 1);

		if (game.p1_score > game.p2_score)
		{
			game.winner = game.p1_id;
			await this.userService.gameWonAdd(player1.id, player1.game_won + 1, player1.ello + 5);
			await this.userService.gameLostAdd(player2.id, player2.game_lost + 1, player2.ello - 5);
		}
		else 
		{
			game.winner = game.p2_id;
			await this.userService.gameWonAdd(player2.id, player2.game_won + 1, player2.ello + 5)
			await this.userService.gameLostAdd(player1.id, player1.game_lost + 1, player1.ello - 5);
		}
		return await this.service.addGame(game);
	}
}