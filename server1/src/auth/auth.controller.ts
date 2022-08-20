import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Args, Context } from '@nestjs/graphql';
import { Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './guards/jwt-auth.guard';

import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//   @UseGuards(LocalAuthGuard)
//   @Post('login')
//   async login(
//     @CurrentUser() user: User,
//     @Res({ passthrough: true }) response: Response,
//   ) {
//     await this.authService.login(user, response);
//     response.send(user);
//   }

  @UseGuards(LocalAuthGuard)
  @Post('authLogin')
  async authLogin(
    @Context('req') req,
    @Res({ passthrough: true }) response: Response,
    @Args('username') _username: string,
    @Args('password') _password: string,
  ) {
    await this.authService.login(req.user);
    return response.send(req.user);
  }

}