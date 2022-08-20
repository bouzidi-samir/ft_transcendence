import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Game } from "../entities/game.entity";

@ObjectType()
export class GameDeleteOutput {
    @Field(() => ID)
    gameId: Game['id'];
}