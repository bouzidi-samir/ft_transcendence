import { Module } from '@nestjs/common';
import Game from './entities/game.entity';
import { gameController } from './game.controller';
import { gameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import User from 'src/users/entities/user.entity';
import { Relations } from 'src/users/entities/relations.entity';

@Module({
  controllers: [gameController],
	providers: [gameService],
 	imports: [
		 TypeOrmModule.forFeature([Game, Player, User, Relations])
	],
	exports: [gameService]
})
export class gameModule {}