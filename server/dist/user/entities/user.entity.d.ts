import { Game } from 'src/game/entities/game.entity';
import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
    password: string;
    avatar?: string;
    online: boolean;
    lastScore: number;
    bestScore: number;
    games: Game[];
    readonly gameId: Game['id'];
    userRepository: any;
}
