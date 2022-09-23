import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ChatService } from "./chat.service";

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService){}

    @Inject(ChatService)
    private readonly service: ChatService


    @Post('/createRoom') // tag, username
    async createRoom( @Body() body: any ): Promise<any> {
        return this.service.createRoom(body);
    }

    @Post('/createGlobalRoom')
    async createGlobalRoom(): Promise<any> {
        return this.service.createGlobalRoom();
    }

    @Post('/joinRoom') // tag, username
    async joinRoom(@Body() body: any): Promise<any> {
        return this.service.joinRoom(body);
    }

    @Post('/blockMember') // tag, username, toBlockUsername
    async blockMember( @Body() body: any): Promise<any> {
        return this.service.blockMember(body);
        }
}