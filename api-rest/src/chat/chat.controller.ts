import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import JwtTwoFactorGuard, { JwtAuthGuard } from "src/auth/jwt-authguards";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService){}

    @Inject(ChatService)
    private readonly service: ChatService

 
    @Get('/rooms')
	async getUsers(): Promise<any> {
        return await this.service.getAllRooms();
    }

	@UseGuards(JwtTwoFactorGuard)
    @Post('/setOnline') 
    async setOnline( @Body() body: any ): Promise<any> {
        return this.service.setOnline(body);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Post('/setOffline') 
    async setOffline( @Body() body: any ): Promise<any> {
        return this.service.setOffline(body);
    }

	@UseGuards(JwtTwoFactorGuard)
    @Post('/setInGame') 
    async setInGame( @Body() body: any ): Promise<any> {
        return this.service.setInGame(body);
    }

	@UseGuards(JwtTwoFactorGuard)
    @Post('/leaveGame') 
    async leaveGame( @Body() body: any ): Promise<any> {
        return this.service.leaveGame(body);
    }

    @Get('getRoomMembers/:roomTag')
    async getRoomMembers(@Param('roomTag') roomTag: string, @Body() body: any): Promise<any> 
    {
        return await this.service.getRoomMembers(roomTag);
    }

    @Get('getRoomAdmin/:roomTag')
    async getRoomAdmin(@Param('roomTag') roomTag: string, @Body() body: any): Promise<any> 
    {
        return await this.service.getRoomAdmin(roomTag);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Post('/createRoom') // tag, username
    async createRoom( @Body() body: any ): Promise<any> {
        return this.service.createRoom(body);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Post('/createGlobalRoom')
    async createGlobalRoom(): Promise<any> {
        return this.service.createGlobalRoom();
    }

    @Post('/createMyfriendsRoom') // username
    async createMyFriendsRoom(@Body() body: any): Promise<any> {
        return this.service.createMyFriendsRoom(body);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Post('/checkIfMember')
    async checkIfMember(@Body() body:any): Promise<any> {
        return this.service.checkIfMember(body);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Post('/joinRoom') // tag, username
    async joinRoom(@Body() body: any): Promise<any> {
        return this.service.joinRoom(body);
    }

    @Post('/editRoom')
    async editRoom(@Body() body:any): Promise<any> { // tag, status, + password

        return this.service.editRoom(body);
    }

    @Post('/updateRoom/:roomtag')
    async updateRoom(
        @Param('roomtag') roomTarget : string,
        @Body() body:any
        )
        : Promise<any> { 
            return this.service.updateRoom(roomTarget, body);
    }



    @Get('/getActiveRoom/:id') // username
    async getActiveRoom(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: any
    )
    : Promise<any> {
        return this.service.getActiveRoom(id);
    }

    @Post('/adminizer')
    async adminizer(@Body() body:any): Promise<any> { // username, tag, targetName
        return this.service.adminizer(body);
    }

    @Post('setPassword')
    async setPassword(@Body() body:any):Promise<any> { // username, tag, action(change ou cancel), password
        return this.service.setPassword(body);
    }

    @Post('/leaveRoom') // tag, username
    async leaveRoom(@Body() body: any): Promise<any> {
        return this.service.leaveRoom(body);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Post('/banMember') // tag, username, toBanUsername
    async banMember( @Body() body: any): Promise<any> {
        return this.service.banMember(body);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Post('/checkBan') // tag, username
    async checkBan( @Body() body: any): Promise<any> {
        return this.service.checkBan(body);
    }

    @Post('/unblockMember') // params: username: string, toUnblockUsername: string
	async unBlockMember(@Body() body: any): Promise<any>  {
		return await this.service.unblockMember(body);
	}

    @Post('/muteMember') // tag, username, toMuteUsername, minutes (minutes to mute)
    async muteMember( @Body() body: any): Promise<any> {
        return this.service.muteMember(body);
    }

    @Post('/unmuteMember') // tag, username, toUnmuteUsername
	async unmuteMember(@Body() body: any): Promise<any>  {
		return await this.service.unmuteMember(body);
	}

    @UseGuards(JwtTwoFactorGuard)
    @Post('/checkMute')
    async checkMute(@Body() body:any): Promise<any> {
        return await this.service.checkMute(body);
    }

    @Post('roomInvitation')
    async roomInvitation(@Body() body: any): Promise<any> {
        return await this.service.roomInvitation(body);
    }

    @UseGuards(JwtTwoFactorGuard)
    @Post('/checkRoomInvitation')
		async checkRoomInvitation(@Body() body: any): Promise<any> { // username
			return await this.service.checkRoomInvitation(body);
	}

    @UseGuards(JwtTwoFactorGuard)
    @Post('/acceptOneRoomInvitation')
	async acceptOneRoomInvitation(@Body() body: any): Promise<any> { // username, fromUsername, tag
		return await this.service.acceptOneRoomInvitation(body);
	}

    @UseGuards(JwtTwoFactorGuard)
    @Post('/refuseOneRoomInvitation')
	async refuseOneRoomInvitation(@Body() body: any): Promise<any> { // username, fromUsername, tag
		return await this.service.refuseOneRoomInvitation(body);
	}

	// @Post('/acceptAllRoomInvitation')
	// async acceptAllRoomInvitation(
	// 	@Body() body: any): Promise<any> { // username: string
	// 	return await this.service.acceptAllRoomInvitation(body);
	// }

    // ------------------------- Messages ------------------------------------------------
   
    @Get('getRoomMessages/:roomTag')
    async getRoomMessages(@Param('roomTag') roomTag: string, @Body() body: any): Promise<any> 
    {
        return await this.service.getRoomMessages(roomTag);
    }

   
    @Post('saveMessage')
    async saveMessage(@Body() body:any): Promise<any> { // username, tag
        return await this.service.saveMessage(body);
    }

        //--------------------------------- GAME   -------------------------------------------

        @UseGuards(JwtTwoFactorGuard)
        @Post('gameInvitation')
        async gameInvitation(@Body() body: any): Promise<any> {
            return await this.service.gameInvitation(body);
        }
    
        @UseGuards(JwtTwoFactorGuard)
        @Post('/checkGameInvitation')
            async checkGameInvitation(@Body() body: any): Promise<any> { 
                return await this.service.checkGameInvitation(body);
        }
    
        @UseGuards(JwtTwoFactorGuard)
        @Post('/acceptOneGameInvitation')
        async acceptOneGameInvitation(@Body() body: any): Promise<any> { 
            return await this.service.acceptOneGameInvitation(body);
        }
    
        @UseGuards(JwtTwoFactorGuard)
        @Post('/refuseOneGameInvitation')
        async refuseOneGameInvitation(@Body() body: any): Promise<any> { 
            return await this.service.refuseOneGameInvitation(body);
        }
    
        // @Post('/acceptAllRoomInvitation')
        // async acceptAllRoomInvitation(
        // 	@Body() body: any): Promise<any> { // username: string
        // 	return await this.service.acceptAllRoomInvitation(body);
        // }
    

}