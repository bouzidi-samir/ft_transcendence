import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class UsersService {
    constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
	) {}
    
    async addUser(user: User): Promise<User> {
		const addedUser = this.userRepository.create(user);
		await this.userRepository.save(addedUser);
		return addedUser;
	}

    async getUserByUsername(username: string): Promise<User>
	{
		return await this.userRepository.findOne({
			where: {"username": username}
		})
	}

}
