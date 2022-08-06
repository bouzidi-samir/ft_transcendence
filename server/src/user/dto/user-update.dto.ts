import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UserCreateInput, UserCreateOutput } from './user-create.dto';

@InputType()
// export class UserUpdateInput extends UserCreateInput {}
export class UserUpdateInput 
{
    @Field(() => String, { nullable: true })
    name: string;
  
    @Field(() => String, { nullable: true })
    email: string;
  
    @Field(() => String, { nullable: true })
    password: string;
  
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
export class UserUpdateOutput extends UserCreateOutput {}
