import { Args, Query, Resolver } from "@nestjs/graphql";
import { Game } from "../entities/game.entity";
import { GameService } from "../game.service";

@Resolver(Game)
export class GameQueriesResolver {
  constructor(private readonly gameService: GameService) {}

@Query(() => [Game])
async gameList() {
    return this.gameService.gameList();
}

@Query(() => Game)
async gameById(@Args('id') id: string) {
    return this.gameService.gameById(id);
}

@Query( ()=> [Game])
async gameByPlayerId(playerId: Game['playerId']): Promise<Game> {
  return this.gameService.gameById(playerId);
}

}