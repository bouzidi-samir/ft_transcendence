import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { GameCreateInput, GameCreateOutput } from "../dto/game-create.dto";
import { GameDeleteOutput } from "../dto/game-delete.dto";
import { Game } from "../entities/game.entity";
import { GameService } from "../game.service";
import { JWTPayload } from 'src/auth/auth.service';
import { UseGuards } from "@nestjs/common";
import { CurrentUser, JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Resolver(Game)
export class GameMutationsResolver {
    constructor( private readonly gameService: GameService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => GameCreateOutput)
    async gameCreate(  
        @CurrentUser() user: JWTPayload, 
        @Args('input') input: GameCreateInput,){
    return this.gameService.gameCreate( user, input);
    }

    @Mutation(() => GameDeleteOutput)
    async gameDelete(@Args({ name: 'gameId', type: () => ID}) gameId: Game['id'],){
        return this.gameService.gameDelete(gameId);
    }
}