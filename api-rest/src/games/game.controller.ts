import { Controller, Get, Post, Inject, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import Game from './game.entity';
import {gameService} from './game.service';

@Controller('games')
export class gameController {
    constructor(private readonly gameService: gameService) {}
    @Inject(gameService)
	private readonly service: gameService;

    @Get()
	async getGames(): Promise<Game[]> {
        return await this.service.getAllGames();
    }

    @Get(":id")
	async getGameById(
		@Param('id') id: number
	): Promise<Game> {
		return await this.service.getGameById(id);
	}

	@Post("result")
	async gameResult(@Body() Body)
	{
		let game = new Game;
		game = Body.game;
		// rajouter dans l historique des joueurs par la suite
		return await this.service.addGame(game);
	}
}