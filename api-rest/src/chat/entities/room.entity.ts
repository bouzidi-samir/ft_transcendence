import User from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    tag: string;

    @Column({default: false})
    global: boolean;

    @Column({default: false})
    private: boolean;

    @Column({default: false})
    public: boolean;

    @Column({default: false})
    friendly: boolean;

    @Column({nullable: true})
    password:string;   
}