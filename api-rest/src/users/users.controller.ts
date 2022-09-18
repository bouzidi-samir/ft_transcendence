import { Controller, Get, Post, Inject, Param, Body, ParseIntPipe, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
//import { getBase64FromBuffer } from 'src/auth/utils';
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

	@Post("/register/:id")
	async setStatus(
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

	@Post('/:id/avatar')
	@UseInterceptors(FileInterceptor('file'))
	async updateAvatar(
		@Param('id', ParseIntPipe) id: number,
		@UploadedFile() file: any
	): Promise<any> {
		//let image; //= await getBase64FromBuffer(file.buffer);
		console.log(file);
		//await this.service.updateAvatar(id, image);
	}
}
