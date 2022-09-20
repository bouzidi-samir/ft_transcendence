import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { Repository, DataSource } from 'typeorm';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
	) {}
    
    getAllUsers(): Promise<User[]> {
        return this.userRepository.find() // SELECT * from user
    }

    async getUserById(id: number): Promise<User>
    {
        
        const user = await this.userRepository.findOne({where: {id: id}});
        return user;      
    }
    
    async getUserByUsername(username: string): Promise<User>
    {
        const user = await this.userRepository.findOne({where: {username: username}});
        return user; 
    }

    async addUser(user: User): Promise<User> {
		const addedUser = this.userRepository.create(user);
		await this.userRepository.save(addedUser);
		return addedUser;
	}

    async setRegister(id: number): Promise<any> {
        return await this.userRepository.query(
            `UPDATE "user" SET "registred" = $1, updated_at = NOW() WHERE id = $2;`,
            ["true", id]
        );
    }

    async updateNickname(id: number, nickname: string): Promise<any> {
		if (!nickname)
			return {error: "Veuillez saisir un pseudo"}
		return await this.userRepository.query(
			`UPDATE "user" SET "nickname" = $1, updated_at = NOW() WHERE id = $2;`,
			[nickname, id]
		);
        //return await this.userRepository.findOne({where: {id: id}});
	}

    async updateAvatar(id: number, image: string): Promise<any> {
        await this.userRepository.query(
			`UPDATE "user" SET "avatar_url" = $1, updated_at = NOW() WHERE id = $2;`,
			[image, id]
		);
        return await this.userRepository.findOne({where: {id: id}});
	}

    async getAvatar(id: number): Promise<any> {
        let rep =  await this.userRepository.query(
			`SELECT "avatar_url" FROM "user" WHERE id = $1;`,
			[id]
		);
        return rep;
    }
}
