import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Game } from "../../game/entities/game.entity";
import { GameService } from "../../game/game.service";

@Resolver(User)
export class UserFieldsResolver {
  constructor(
    private userService: UserService,
    private gameService: GameService,
  ) {}

  @ResolveField(() => Game, { nullable: true })
  async player(@Parent() user: User) {
    if (!user.gameId) {
      return null;
    }
    try {
      return await this.userService.userGetById(user.gameId);
    } catch (e) {
      return null;
    }
  }
}