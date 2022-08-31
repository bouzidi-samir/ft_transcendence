import { Controller, Get, Inject, Param } from '@nestjs/common';
import User from './user.entity';
import { UsersService } from './users.service'; 

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Inject(UsersService)
	private readonly service: UsersService;

	@Get("/user/:username")
	async searchUser(
		@Param('username') username: string
	): Promise<User> {
		return await this.service.getUserByUsername(username);
	}
}
