import { BaseEntity } from 'typeorm';
export declare abstract class Node extends BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
