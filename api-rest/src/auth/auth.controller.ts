import { AuthService } from './auth.service';
import {getUserAccessToken }  from './utils';
import { Controller, Get, Param, Inject, Body, Post, Header, StreamableFile, Res, ParseIntPipe, Delete, UseGuards } from '@nestjs/common';
import User from 'src/users/user.entity';

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
	): Promise<string> {
		let api = await getUserAccessToken(
			'7b4d5bf2e660cabc43c2fc7f0ab4dc0715929525952231c59c8a39be728cc670', 
			'6fa238a221040adadeaa4a5934e546414387154964dbbabe3189a0b7db211496',
			code, body.redirect_uri
		);
	//	let infos = await getUserInformations(api.access_token);
		//let user = await this.service.getUserBy42Username(infos.login);
	//	let user = new Object;

	//	if (!user)
	//	{
	//		let req: User = new User();
	//		req.username = infos.login;
	//		req["42_username"] = infos.login;
			//user = await this.service.addUser(req);
	//	}
		return JSON.stringify({
			user: "sam"
			//username: req.username,
			//"42_username": req["42_username"],
		});
	}
}
