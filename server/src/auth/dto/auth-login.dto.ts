import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class AuthLoginInput {

  @Field()
  username: string;

  @Field()
  password: string;

}

@ObjectType()
export class AuthLoginOutput {
  @Field(() => String)
  accessToken: string;

}

