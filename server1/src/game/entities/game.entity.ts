import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
// import { Node} from "src/pagination/entities/node.entity";

@Entity()
@ObjectType()
export class Game extends BaseEntity {
    
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;
  
    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column()
    score: number;
    
    @Field()
    @Column({nullable: true})
    win: boolean;
    
    @Field()
    @Column({nullable: true})
    loss: boolean;

    // @Field()
    // @Column({nullable: true})
    // opponent: string;

    @ManyToOne(() => User, user => user.games)
    @Field(() => User)
    user: User;

    @RelationId((self: Game) => self.user)
    readonly playerId: User['id'];
    gameRepository: any;

    // @Column()
    // @Field()
    // userId: string;
    

}