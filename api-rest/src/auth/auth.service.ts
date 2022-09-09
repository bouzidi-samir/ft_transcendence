import { Injectable, Inject } from '@nestjs/common';
import fetch from 'node-fetch';
import { EntityListenerMetadata } from 'typeorm/metadata/EntityListenerMetadata';
import User from '../users/user.entity'
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

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

    async addUser(user: User)
	{
        try {
            return await this.getUserByUsername(user.username);
        }
        catch {
            return await this.users.userRepository.save(user);
        }
	}

    getUniqueID(): string { return process.env.API_UID; }
	
    getSecret(): string { return process.env.API_SECRET; }

}
