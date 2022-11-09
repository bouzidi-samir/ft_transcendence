import { AuthService } from './auth.service';
import {getUserAccessToken, getUserInformations }  from './utils';
import { Controller, Get, Param, Inject, Body, Post, Header, StreamableFile, Res, ParseIntPipe, Delete, UseGuards, Request } from '@nestjs/common';
import User from '../users/entities/user.entity';
import { PassThrough } from 'stream';
import { URLSearchParams } from 'url';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-authguards'
import { LocalAuthGuard } from './local-auth.guards'

@Controller('auth')
export class AuthController {

    @Inject(AuthService)
	private readonly service: AuthService;

	@Post("/authorize")
	authorize(
		@Body() body: any
	): string {
		let url: URL = new URL("https://api.intra.42.fr/oauth/authorize");
			url.searchParams.append("client_id", '6e52620f16bfa38095e26eae2231051c3fff5161197180b12228a4a2e04bbdb1');
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
			'6e52620f16bfa38095e26eae2231051c3fff5161197180b12228a4a2e04bbdb1', 
			'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',
			code, body.redirect_uri
		);
		let infos = await this.service.getUserInformations(api.access_token);
		let user = new User;
		user.username = infos.login;
		user.avatar_url = infos.image_url; 
		user.email = infos.email;
		let finaluser = await this.service.addUser(user);
		let token = await this.service.createToken(finaluser);
		return JSON.stringify({
			id: finaluser.id,
			username: finaluser.username,
			nickname: finaluser.nickname,
			registred: finaluser.registred,
			avatar_url: finaluser.avatar_url,
			status: finaluser.status,
			JWT_token: token,
			TFOenabled: finaluser.isTwoFactorAuthenticationEnabled,		
		});
	}
	
	@UseGuards(JwtAuthGuard)
  	@Get('profile')
  	getProfile(@Request() req) {
    return req.user;
	}
}
