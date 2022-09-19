import { Controller, Get, Post, Inject, Param, Body, ParseIntPipe, Header, Patch, 
	UseInterceptors, UploadedFile, StreamableFile, Res } from '@nestjs/common';
import { TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
//import { getBase64FromBuffer } from 'src/auth/utils';
import User from './entities/user.entity';

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

	@Post("/:id/upload")
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: "./upload", filename: (req, file, callback) => {
                let fileName = (Math.random() + 1).toString(36).substring(7);
                callback(null, fileName + extname(file.originalname))
            }
        })
    }))
    async uploadFile(
	@Param('id', ParseIntPipe) id: number,
	@UploadedFile() file: any, 
	@Body() params: any) 
	{	
		let url = "http://localhost:4000/users/" + file.path;
		return this.service.updateAvatar(id, url)
    } 

	@Get("upload/:filename")
    async getFile(@Param("filename") filename: string, @Res() res: any) {
        res.sendFile(filename, { root: './upload' });
    }
}




