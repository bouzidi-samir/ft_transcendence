import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserCreateInput } from 'src/user/dto/user-create.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from '../auth.service';
import { AuthLoginOutput } from '../dto/auth-login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthMutationsResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthLoginOutput)
  async authLogin(
    @Context('req') req,
    @Args('username') _username: string,
    @Args('password') _password: string,
  ) {
    return this.authService.login(req.user);
  }

  
}
