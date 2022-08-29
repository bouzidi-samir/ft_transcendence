import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AuthService {

    getUniqueID(): string { return process.env.API_UID; }
	
    getSecret(): string { return process.env.API_SECRET; }

}
