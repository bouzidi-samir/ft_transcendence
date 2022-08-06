import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthLoginOutput } from './dto/auth-login.dto';
export interface JWTPayload {
    id: string;
    email: string;
    name: string;
}
export declare class AuthService {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(name: string, password: string): Promise<any>;
    login(user: User): Promise<AuthLoginOutput>;
}
