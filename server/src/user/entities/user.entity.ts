import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/game/entities/game.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm';

@Entity() // decorateur typeorm
@ObjectType()     // objet graphql                                    //Field =>graphql Column => typeorm
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
  
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column({ unique: true })
  name: string;
  
  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @Field(() => Boolean)
  @Column({ nullable: true })
  online: boolean;

  @Field(() => Int, { nullable: true })
  @Column( { nullable: true })
  lastScore: number;

  @Field(() => Int, { nullable: true })
  @Column( { nullable: true })
  bestScore: number;

  @OneToMany(() => Game, game => game.user)
  @Field(() => [Game], {nullable: true})
  games: Game[];

  @RelationId((self: User) => self.games)
  readonly gameId: Game['id'];
  userRepository: any;


}
