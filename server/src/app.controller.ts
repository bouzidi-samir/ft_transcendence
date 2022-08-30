import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { AuthMutationsResolver } from 'src/auth/resolvers/auth.mutations.resolver';
import { AuthLoginOutput } from 'src/auth/dto/auth-login.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { UserCreateInput, UserCreateOutput } from 'src/user/dto/user-create.dto';
import { argsToArgsConfig } from 'graphql/type/definition';
import { UserMutationsResolver } from 'src/user/resolvers/user.mutations.resolver';
import { UserQueriesResolver } from 'src/user/resolvers/user.queries.resolver';

@Controller("")
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly mutationsResolver: UserMutationsResolver,
    private readonly authMutations : AuthMutationsResolver,
    private readonly UserQueries : UserQueriesResolver,
  ) {}

  @Get("callback")
  async getCode(@Query('code') code: number,)
  {
    try {
      let token = await axios.post(
      'https://api.intra.42.fr/oauth/token',
      { grant_type: 'authorization_code', 
        client_id: '6e52620f16bfa38095e26eae2231051c3fff5161197180b12228a4a2e04bbdb1', 
        client_secret:'08154b57d6afec0edd37ab73b28a597f91d08a79bfb2ea7851fc86f5d9a6b757',
        code,
        redirect_uri: 'http://localhost:3000',
        state: 'Quentin'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    let result = await axios.get(
      'https://api.intra.42.fr/v2/me',
      {
        headers: {
          'Authorization': "Bearer " + token['data']['access_token'],
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    let args = {
      name : result['data']['login'],
      email : result['data']['email'],
      password : "test",
      online : false,
      avatar: result['data']['image_url'],
      lastScore : 0,
      bestScore: 0,
    }
    let usr;
    try {
      usr = await this.mutationsResolver.userCreate(args);
    }
    catch (e){
      usr = await this.UserQueries.userGetByName(args['name']);
    }
    let req = {user : usr,}
    let payLoad = await this.authMutations.authLogin(req, usr['name'], usr['password']);
    console.log(payLoad);
    return ({payLoad});
   }
    catch (e){console.log(e)};
  }
}
