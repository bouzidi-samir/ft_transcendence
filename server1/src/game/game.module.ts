import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Game } from './entities/game.entity';
import { GameService } from './game.service';
import { GameFieldsResolver } from './resolvers/game.Fields.resolver';
import { GameMutationsResolver } from './resolvers/game.mutations.resolver';
import { GameQueriesResolver } from './resolvers/game.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User]), UserModule],
  providers: [GameService, GameMutationsResolver, GameQueriesResolver, GameFieldsResolver]
})
export class GameModule {}
