import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/entities/game.entity';
import { User } from './entities/user.entity';
import { UserMutationsResolver } from './resolvers/user.mutations.resolver';
import { UserQueriesResolver } from './resolvers/user.queries.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Game])],
  providers: [UserService, UserMutationsResolver, UserQueriesResolver],
  exports: [UserService],
})
export class UserModule {}
