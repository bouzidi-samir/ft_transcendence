import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
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

    @Post('/createRoom') // tag, username
    async createRoom( @Body() body: any ): Promise<any> {
        return this.service.createRoom(body);
    }

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

    @Post('/joinRoom') // tag, username
    async joinRoom(@Body() body: any): Promise<any> {
        return this.service.joinRoom(body);
    }

    @Get('/getActiveRoom') // username
    async getActiveRoom(@Body() body:any): Promise<any> {
        return this.service.getActiveRoom(body);
    }

    @Post('/adminizer')
    async adminizr(@Body() body:any): Promise<any> { // username, tag, targetName
        return this.service.adminizer(body);
    }

    @Post('/leaveRoom') // tag, username
    async leaveRoom(@Body() body: any): Promise<any> {
        return this.service.leaveRoom(body);
    }

    @Post('/blockMember') // tag, username, toBlockUsername
    async blockMember( @Body() body: any): Promise<any> {
        return this.service.blockMember(body);
    }

    @Post('/unblockMember') // params: username: string, toUnblockUsername: string
	async unBlockMember(@Body() body: any): Promise<any>  {
		return await this.service.unblockMember(body);
	}

    @Post('/muteMember') // tag, username, toMuteUsername
    async muteMember( @Body() body: any): Promise<any> {
        return this.service.muteMember(body);
    }

    @Post('/unmuteMember') // tag, username, toUnmuteUsername
	async unmuteMember(@Body() body: any): Promise<any>  {
		return await this.service.unmuteMember(body);
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

    @Post('saveMessage')
    async saveMessage(@Body() body:any): Promise<any> { // username, tag
        return await this.service.saveMessage(body);
    }

    @Post('getRoomMessages')
    async getRoomMessages(@Body() body:any): Promise<any> {
        return await this.service.getRoomMessages(body);
    }
}