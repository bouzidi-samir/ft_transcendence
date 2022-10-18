import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-authguards";
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

    @Get('getRoomMembers/:roomTag')
    async getRoomMembers(@Param('roomTag') roomTag: string, @Body() body: any): Promise<any> 
    {
        return await this.service.getRoomMembers(roomTag);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/createRoom') // tag, username
    async createRoom( @Body() body: any ): Promise<any> {
        return this.service.createRoom(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/createGlobalRoom')
    async createGlobalRoom(): Promise<any> {
        return this.service.createGlobalRoom();
    }

    @Post('/createMyfriendsRoom') // username
    async createMyFriendsRoom(@Body() body: any): Promise<any> {
        return this.service.createMyFriendsRoom(body);
    }

    @Post('/checkIfMember')
    async checkIfMember(@Body() body:any): Promise<any> {
        return this.service.checkIfMember(body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/joinRoom') // tag, username
    async joinRoom(@Body() body: any): Promise<any> {
        return this.service.joinRoom(body);
    }

    @Post('/editRoom')
    async editRoom(@Body() body:any): Promise<any> { // tag, status, + password

        return this.service.editRoom(body);
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

    @Post('/blockMember') // tag, username, toBlockUsername, minutes (minutes to mute)
    async blockMember( @Body() body: any): Promise<any> {
        return this.service.blockMember(body);
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

    @Post('/checkMute')
    async checkMute(@Body() body:any): Promise<any> {
        return await this.service.checkMute(body);
    }

    @Post('roomInvitation')
    async roomInvitation(@Body() body: any): Promise<any> {
        return await this.service.roomInvitation(body);
    }

    @Post('/checkRoomInvitation')
		async checkRoomInvitation(@Body() body: any): Promise<any> { // username
			return await this.service.checkRoomInvitation(body);
	}

    @Post('/acceptOneRoomInvitation')
	async acceptOneRoomInvitation(@Body() body: any): Promise<any> { // username, fromUsername, tag
		return await this.service.acceptOneRoomInvitation(body);
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

}