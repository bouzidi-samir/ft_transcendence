import { User } from '../entities/user.entity';
export declare class UserCreateInput {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    lastScore: number;
    bestScore: number;
}
export declare class UserCreateOutput {
    user: User;
}
