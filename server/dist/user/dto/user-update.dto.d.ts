import { UserCreateOutput } from './user-create.dto';
export declare class UserUpdateInput {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    lastScore: number;
    bestScore: number;
    online: boolean;
}
export declare class UserUpdateOutput extends UserCreateOutput {
}
