import {getUserAccessToken, getUserInformations }  from './utils';
import { Controller, Get, Param, Inject, Body, Post, Header, StreamableFile, Res, ParseIntPipe, Delete, UseGuards, Request } from '@nestjs/common';
import User from '../users/user.entity';
import { PassThrough } from 'stream';
import { URLSearchParams } from 'url';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-authguard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    @Inject(AuthService)
	private readonly service: AuthService;

	@Post("/authorize")
	authorize(
		@Body() body: any
	): string {
		let url: URL = new URL("https://api.intra.42.fr/oauth/authorize");
			url.searchParams.append("client_id", '7b4d5bf2e660cabc43c2fc7f0ab4dc0715929525952231c59c8a39be728cc670');
			url.searchParams.append("redirect_uri", body.redirect_uri);
			url.searchParams.append("response_type", "code");
		return JSON.stringify({url: url.toString()});
	}

	@Post("/token/:code")
	async login(
		@Param("code") code: string,
		@Body() body: any
	): Promise<any> {
		let api = await this.service.getUserAccessToken(
			'7b4d5bf2e660cabc43c2fc7f0ab4dc0715929525952231c59c8a39be728cc670', 
			'6fa238a221040adadeaa4a5934e546414387154964dbbabe3189a0b7db211496',
			code, body.redirect_uri
		);
		let infos = await this.service.getUserInformations(api.access_token);
		let fortyTwoUser: User = new User();
		fortyTwoUser.username = infos.login;
		fortyTwoUser.avatar_url = infos.image_url; 
		let user = new User;
		user.username = fortyTwoUser.username;
		user.avatar_url = fortyTwoUser.avatar_url;
		user.registred = "false";
		user.email = infos.email;
		user = await this.service.addUser(user);
		let token = await this.service.createToken(user);
		//console.log(token);
		//return (token);
		return JSON.stringify({
			id: "",
			username: user.username,
			nickname: "undefined",
			registred: user.registred,
			avatar_url: user.avatar_url,
			status: "online",
			JWT_token: token,	
		});
	}

	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	getProfile(@Request() req) {
    return req.user;
  }
}
