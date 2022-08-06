import { AuthService } from '../auth.service';
import { AuthLoginOutput } from '../dto/auth-login.dto';
export declare class AuthMutationsResolver {
    private readonly authService;
    constructor(authService: AuthService);
    authLogin(req: any, _username: string, _password: string): Promise<AuthLoginOutput>;
}
