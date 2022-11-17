import { AuthService } from './auth.service';
import {getUserAccessToken, getUserInformations }  from './utils';
import { Controller, Get, Param, Inject, Body, Post, Header, StreamableFile, Res, ParseIntPipe, Delete, UseGuards, Request } from '@nestjs/common';
import User from '../users/entities/user.entity';
import { PassThrough } from 'stream';
import { URLSearchParams } from 'url';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-authguards'
import { LocalAuthGuard } from './local-auth.guards'
import { Console } from 'console';

@Controller('auth')
export class AuthController {

    @Inject(AuthService)
	private readonly service: AuthService;

	@Post("/authorize")
	authorize(
		@Body() body: any
	): string {
		let url: URL = new URL("https://api.intra.42.fr/oauth/authorize");
			url.searchParams.append("client_id", process.env.FORTY_TWO_ID);
			url.searchParams.append("redirect_uri", body.redirect_uri);
			url.searchParams.append("response_type", "code");
		return JSON.stringify({url: url.toString()});
	}

	@Post("/logout")
	async logout(@Body() body: any)
	{
		this.service.logout(body.userId);
	}

	@Post("/token/:code")
	async login(
		@Param("code") code: string,
		@Body() body: any
	): Promise<string> {
		
		let api = await this.service.getUserAccessToken(
			// '7b4d5bf2e660cabc43c2fc7f0ab4dc0715929525952231c59c8a39be728cc670','8f0429ab7bec196067bb438e31cd08b9e07a79953cd6a932fc0f4595dced75d7',
			process.env.FORTY_TWO_ID, process.env.FORTY_TWO_CLIENT_SECRET,
			code, body.redirect_uri
		);
		let infos = await this.service.getUserInformations(api.access_token);
		let user = new User;
		user.username = infos.login;
		user.avatar_url = infos.image_url; 
		user.email = infos.email;
		user.isTwoFactorAuthenticationEnabled = false; 
		let finaluser = await this.service.addUser(user);
		let token = await this.service.createToken(finaluser);
		return JSON.stringify({
			id: finaluser.id,
			username: finaluser.username,
			nickname: finaluser.nickname,
			registred: finaluser.registred,
			avatar_url: finaluser.avatar_url,
			status: finaluser.status,
			JWT_token: token.access_token,
			TFOenabled: finaluser.isTwoFactorAuthenticationEnabled,
			ello : finaluser.ello,
			gamePlayed : finaluser.game_played,
			gameWon : finaluser.game_won,
			gameLost : finaluser.game_lost,	
		});
	}
	
	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	getProfile(@Request() req) {
    return req.user;
	}
}
