import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/game/entities/game.entity';
import { OneToMany } from 'typeorm';
import { User } from '../entities/user.entity';

@InputType()
export class UserCreateInput {

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field()
  online: boolean;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => Int, { nullable: true })
  lastScore: number;

  @Field(() => Int, { nullable: true })
  bestScore: number;

  // @OneToMany(() => Game, game => game.user)
  // @Field(() => Game)
  // games: Game[];
}

@ObjectType()
export class UserCreateOutput {
  @Field(() => User)
  user: User;
}
