import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import { EntityListenerMetadata } from 'typeorm/metadata/EntityListenerMetadata';
import User from '../users/entities/user.entity'
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {TokenPayload} from './dto/tokenPayload.interface';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {

    constructor( private jwtService: JwtService) {}

    @Inject(UsersService)
	public readonly users: UsersService;
    

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

    async getUserById(userId: number): Promise<User>
	{
	    const user = await this.users.userRepository.findOneOrFail({where: {id: userId}});
        return user;
	}

    async logout(userId: number)
	{
	    return await this.users.logout(userId);
	}

    async addUser(user: User)
	{
        try {
            return await this.getUserByUsername(user.username);
        }
        // catch {
        //     await this.users.userRepository.save(user);
        //     return await this.getUserByUsername(user.username);
        // }
        catch (e){
            return await this.users.addUser(user);
        }
	}

    async createToken(user: User)
    {
        const payload = {isSecondFactorAuthenticated : false,
            sub: user.id, //sub pour stocker l id pour les standards jwt
        };
        let token = this.jwtService.sign(payload);
        await this.users.updateToken(token, user.id);
        return {
            access_token: token,
          };
    }

    public async getCookieWithJwtAccessToken(userId: number, isSecondFactorAuthenticated = false) {
        const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
        const token = this.jwtService.sign(payload, {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        });
        await this.users.updateToken(token, userId);
        return {
            access_token: token,
          };
    }

    getUniqueID(): string { return process.env.API_UID; }
	
    getSecret(): string { return process.env.API_SECRET; }

}
