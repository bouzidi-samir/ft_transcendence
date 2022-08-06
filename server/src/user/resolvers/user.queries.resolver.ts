import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser, JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Game } from "src/game/entities/game.entity";
import { User } from "../entities/user.entity";
import { UserService } from "../user.service";
import { UseGuards } from "@nestjs/common";
import { JWTPayload } from 'src/auth/auth.service';

@Resolver(User)
export class UserQueriesResolver {
  constructor(private readonly userService: UserService) {}


  @Query( ()=> User)
  async userGetById(@Args('id') id: string) {
    return this.userService.userGetById(id);
  }

  @Query( ()=> User)
  async userGetByEmail(@Args('email') email: string) {
    return this.userService.userGetByEmail(email);
  }

  // @UseGuards(JwtAuthGuard)
  // @Query(() => [User])
  // async userGetAll( @CurrentUser() user: JWTPayload, ) {
  //   return this.userService.userGetAll(user);
  // }

  @Query(() => [User])
  async userGetAll() {
    return this.userService.userGetAll();
  }

}