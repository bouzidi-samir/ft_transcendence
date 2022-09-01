import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import User from './user.entity';

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


}
