import { User } from "src/user/entities/user.entity";
import { BaseEntity } from "typeorm";
export declare class Game extends BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    score: number;
    win: boolean;
    loss: boolean;
    user: User;
    readonly playerId: User['id'];
    gameRepository: any;
}
