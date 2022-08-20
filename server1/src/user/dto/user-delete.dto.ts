import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class UserDeleteOutput {
    @Field(() => ID)
    userId: User['id'];
}