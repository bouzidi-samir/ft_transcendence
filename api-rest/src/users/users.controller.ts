import { Controller, Get, Post, Inject, Param, Body, ParseIntPipe, Header, Patch,
	UseInterceptors, UploadedFile, StreamableFile, Res, Put, UseGuards } from '@nestjs/common';
import { TypeOrmModule, getEntityManagerToken } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataSource } from 'typeorm';
import { EntityManager } from 'typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import User from './entities/user.entity';
import { Relations } from './entities/relations.entity';
import { UsersService } from './users.service'; 
import { JwtAuthGuard } from 'src/auth/jwt-authguards';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Inject(UsersService)
	private readonly service: UsersService;

	// @UseGuards(JwtAuthGuard)
    @Get()
	async getUsers(): Promise<User[]> {
        return await this.service.getAllUsers();
    }

	@UseGuards(JwtAuthGuard)
    @Get('/relations')
	async getRelations(): Promise<Relations[]> {
        return await this.service.getRelations();
    }

	@UseGuards(JwtAuthGuard)
    @Get('/blockedPeople/:username')
	async getBlockedList(
		@Param('username') username : string
	): Promise<Relations[]> {
        return await this.service.getBlockedList(username);
    }

	@UseGuards(JwtAuthGuard)
    @Post("/stats")
	async getUserById(
		@Body() body: any
	): Promise<User> {
		return await this.service.getUserById(body.id);
	}
	

	@UseGuards(JwtAuthGuard)
	@Get("/search/:username")
	async searchUser(
		@Param('username') username: string
	): Promise<User> {
		return await this.service.getUserByUsername(username);
	}

	@UseGuards(JwtAuthGuard)
	@Post("/register/:id")
	async setRegister(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		return await this.service.setRegister(id)
	}

	@UseGuards(JwtAuthGuard)
	@Post("/setStatus/:id")
	async setStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		return await this.service.setRegister(id)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/:id/nickname')
	async updateNickname(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		await this.service.setRegister(id)
		return await this.service.updateNickname(id, body.nickname)
	}

	@UseGuards(JwtAuthGuard)
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
		let url = `http://${process.env.LOCATION_HOST}:4000/users/` + file.path;
		return this.service.updateAvatar(id, url)
    } 

	@Get("upload/:filename")
    async getFile(@Param("filename") filename: string, @Res() res: any) {
        res.sendFile(filename, { root: './upload' });
    }

	@UseGuards(JwtAuthGuard)
	@Get('/friends/:username')
	async getFriends(
	@Param('username') username: string)
	{
		return await this.service.getFriends(username);
	}

		//-----------------------------------------------------------------------------

		@Post('/sendFriendshipRequest')
	async sendFriendshipRequest(
		@Body() body: any): Promise<any>  { // params: senderName, receiverName
		return await this.service.sendFriendshipRequest(body);
	}

	@Post('/checkFriendshipRequest')
		async checkFriendshipRequest(
			@Body() body: any): Promise<any> { // param: username
			return await this.service.checkFriendshipRequest(body);
	}

	@Post('/acceptOneFriendshipRequest')
	async acceptOneFriendshipRequest(
		@Body() body: any): Promise<any> { // params username: string, from: string
		return await this.service.acceptOneFrienshipRequest(body);
	}

	@UseGuards(JwtAuthGuard)
	@Post('/checkFriendship')
		async checkFriendship(
			@Body() body: any): Promise<any> { // param: username
			return await this.service.checkFriendship(body);
	}

	@Post('/acceptAllFriendshipRequest')
	async acceptAllFriendshipRequest(
		@Body() body: any): Promise<any> { // param username: string
		return await this.service.acceptAllFriendshipRequest(body);
	}


	@Post('/displayMyFriendshipRequest')
	async displayMyFriendshipRequest(
		@Body() body: any): Promise<any> { // param username: string
		return await this.service.displayMyFriendshipRequest(body);
	}

	
	@UseGuards(JwtAuthGuard)
	@Post('deleteOneFriendship')
	async deleteOneFriendship(
		@Body() body: any): Promise<any> { // param myUsername: string, otherUsername: string
			return await this.service.deleteOneFriendship(body);
		}


	@Post('/getAllMyFriendships')
	async getAllMyFriends(
		@Body() body: any): Promise<any> { // param username: string
		return await this.service.getAllMyFriendships(body);
	}

	@UseGuards(JwtAuthGuard)
	@Post('/forceToBeMyFriend')
	async forceToBeMyFriend(
		@Body() body: any): Promise<any> { // param myUsername: string, otherUsername: string
			return await this.service.forceToBeMyFriend(body);
	}

	@UseGuards(JwtAuthGuard)
	@Post('/blockUser') // params: username: string, targetUsername: string
	async blockUser(
		@Body() body: any): Promise<any> {
		return await this.service.blockUser(body);
	}

	@Post('/unBlockUser') // params: username: string, targetUsername: string
	async unBlockUser(
		@Body() body: any): Promise<any>  {
		return await this.service.unBlockUser(body);
	}

	@Post('/getAllMyBlockedUser')
	async getAllMyBlockedUser(
		@Body() body: any): Promise<any> { // param username: string
		return await this.service.getAllMyBlockedUser(body);
	}

	@Post('/muteUser') // params: username: string, targetUsername: string
	async muteUser(
		@Body() body: any): Promise<any> {
		return await this.service.muteUser(body);
	}

	@Post('/unmuteUser') // params: username: string, targetUsername: string
	async unmuteuser(
		@Body() body: any): Promise<any>  {
		return await this.service.unmuteUser(body);
	}

	@Post('/getAllMyMutedUser')
	async getAllMyMutedUser(
		@Body() body: any): Promise<any> { // param username: string
		return await this.service.getAllMyMutedUser(body);
	}
}




