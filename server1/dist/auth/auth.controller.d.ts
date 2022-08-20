import { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    authLogin(req: any, response: Response, _username: string, _password: string): Promise<Response<any, Record<string, any>>>;
}
