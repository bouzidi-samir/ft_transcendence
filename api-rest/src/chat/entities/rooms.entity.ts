import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./member.entity";

@Entity()
export class Rooms {

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

    @Column({default: false})
    privateMessage: boolean;

    @Column({nullable: true})
    password:string;

    @Column({nullable: true})
    owner: string;
    
}