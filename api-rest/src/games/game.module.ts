import { Module } from '@nestjs/common';
import Game from './game.entity';
import { gameController } from './game.controller';
import { gameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [gameController],
	providers: [gameService],
 	imports: [
		 TypeOrmModule.forFeature([Game])
	],
	exports: [gameService]
})
export class gameModule {}