import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Game } from "../entities/game.entity";
import { GameService } from "../game.service";




@Resolver(Game)
export class GameFieldsResolver {
  constructor(
    private userService: UserService,
    private gameService: GameService,
  ) {}

  @ResolveField(() => User, { nullable: true })
  async player(@Parent() game: Game) {
    if (!game.playerId) {
      return null;
    }
    try {
      return await this.userService.userGetById(game.playerId);
    } catch (e) {
      return null;
    }
  }
}