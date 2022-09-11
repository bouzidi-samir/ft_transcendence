import { Controller, Get, Post, Inject, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
 import User from './user.entity';

import { UsersService } from './users.service'; 

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Inject(UsersService)
	private readonly service: UsersService;

    @Get()
	async getUsers(): Promise<User[]> {
        return await this.service.getAllUsers();
    }

    @Get(":id")
	async getUserById(
		@Param('id') id: number
	): Promise<User> {
		return await this.service.getUserById(id);
	}

	@Get("/search/:username")
	async searchUser(
		@Param('username') username: string
	): Promise<User> {
		return await this.service.getUserByUsername(username);
	}

	@Post("/register/:id")
	async setRegister(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		return await this.service.setRegister(id)
	}

	@Post('/:id/nickname')
	async updateNickname(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		await this.service.setRegister(id)
		return await this.service.updateNickname(id, body.nickname)
	}

}
