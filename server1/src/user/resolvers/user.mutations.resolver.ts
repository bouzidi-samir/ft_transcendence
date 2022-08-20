import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { UserCreateInput, UserCreateOutput } from '../dto/user-create.dto';
import { UserDeleteOutput } from '../dto/user-delete.dto';
import { UserUpdateInput, UserUpdateOutput } from '../dto/user-update.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';

@Resolver(User)
export class UserMutationsResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserCreateOutput)
  async userCreate(@Args('input') input: UserCreateInput) {

     const password = await bcrypt.hash(input.password, 10);

    return this.userService.userCreate({...input, password});
    // return this.userService.userCreate(input);
  }

  // @UseGuards(JwtAuthGuard)
  @Mutation(() => UserUpdateOutput)
  async userUpdate(
    @Args({ name: 'userId', type: () => ID }) userId: User['id'],
    @Args('input') input: UserUpdateInput,
  ) {
    return this.userService.userUpdate(userId, input);
  }

  @Mutation(() => UserDeleteOutput)
  async userRemove(@Args({ name: 'userId', type: () => ID}) userId: User['id'],) {
    return this.userService.userRemove(userId);
  }

  
}
