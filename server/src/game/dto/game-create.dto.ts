import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { ManyToOne } from "typeorm";
import { Game } from "../entities/game.entity";

@InputType()
export class GameCreateInput {
 
    @Field()
    score: number;

    @Field({nullable: true})
    win: boolean;

    @Field({nullable: true})
    loss: boolean;

    @ManyToOne(() => User, (user) => user.games)
    user: User;
}

@ObjectType()
export class GameCreateOutput {
    @Field(() => Game)
    game: Game;
}