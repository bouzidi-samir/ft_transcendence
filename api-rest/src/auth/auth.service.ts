import { Injectable, Inject, Request, UseGuards } from '@nestjs/common';
import fetch from 'node-fetch';
import { EntityListenerMetadata } from 'typeorm/metadata/EntityListenerMetadata';
import User from '../users/user.entity'
import { UsersService } from '../users/users.service';
import { authenticator } from 'otplib';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    @Inject(UsersService)
	public readonly users: UsersService;

    constructor(
        private jwtService: JwtService
      ) {}

    getUserAccessToken = async (uid: string, secret: string, code: string, redirect_uri: string): Promise<any> => {
        let request = await fetch("https://api.intra.42.fr/oauth/token", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                grant_type: "authorization_code",
                client_id: uid,
                client_secret: secret,
                code: code,
                redirect_uri
            })
        })
        return await request.json();
    }

    getUserInformations = async (access_token: string): Promise<any> => {
        let request = await fetch("https://api.intra.42.fr/v2/me", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        })
        return await request.json();
    }
    
    async getUserByUsername(username: string): Promise<User>
	{
	    const user = await this.users.userRepository.findOneOrFail({where: {username: username}});
        return user;
	}

    async addUser(user: User)
	{
        try {
            return await this.getUserByUsername(user.username);
        }
        catch (e){
            return await this.users.addUser(user);
        }
	}

    async createToken(user: User)
    {
        const payload = { username: user.username,
            sub: user.id, //sub pour stocker l id pour les standards jwt
            nickname: user.nickname,
			registred: user.registred,
			avatar_url: user.avatar_url,
            email: user.email,
			status: "online",};
        let token = this.jwtService.sign(payload);
        await this.users.updateToken(token, user.id)
        return {
            access_token: token,
          };
    }

  /*  async login(@Request() req) {
        console.log(req);
        return req.user;
    }*/

    getUniqueID(): string { return process.env.API_UID; }
	
    getSecret(): string { return process.env.API_SECRET; }

}

@Injectable()
export class TwoFactorAuthenticationService {
  constructor (
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}
 
  public async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
 
   const otpauthUrl = authenticator.keyuri(user.email, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
 
   await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
 
    return {
      secret,
      otpauthUrl
    }
  }
}
