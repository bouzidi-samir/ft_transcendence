import { Module } from '@nestjs/common';
import Games from './entities/game.entity';
import { gameController } from './game.controller';
import { gameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [gameController],
	providers: [gameService],
 	imports: [
		 TypeOrmModule.forFeature([Games]),
		 UsersModule,
	],
	exports: [gameService]
})
export class gameModule {}