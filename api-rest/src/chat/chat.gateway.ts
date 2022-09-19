import { 
    WebSocketGateway, SubscribeMessage, MessageBody,  
    OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect,
    WebSocketServer, 
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io'
  import { ChatService } from './chat.service';
//   import { CreateChatDto } from './dto/create-chat.dto';
//   import { UpdateChatDto } from './dto/update-chat.dto';
  
  @WebSocketGateway(8000, { cors: '*'})
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) {}
    
    @WebSocketServer()
    server: Server;
    
    afterInit(server: any) {
      throw new Error('Method not implemented.');
    }
    
    handleConnection(client: any, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
  
      throw new Error('Method not implemented.');
    }
    
    handleDisconnect(client: any) {
      console.log(`Client disconnected: ${client.id}`);
  
      throw new Error('Method not implemented.');
    }

  
    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
      console.log(message);
      this.server.emit('message', message);
    }
  
    // @SubscribeMessage('createChat')
    // create(@MessageBody() createChatDto: CreateChatDto) {
    //   return this.chatService.create(createChatDto);
    // }
  
    @SubscribeMessage('findAllChat')
    findAll() {
      return this.chatService.findAll();
    }
  
    @SubscribeMessage('findOneChat')
    findOne(@MessageBody() id: number) {
      return this.chatService.findOne(id);
    }
  
    // @SubscribeMessage('updateChat')
    // update(@MessageBody() updateChatDto: UpdateChatDto) {
    //   return this.chatService.update(updateChatDto.id, updateChatDto);
    // }
  
    @SubscribeMessage('removeChat')
    remove(@MessageBody() id: number) {
      return this.chatService.remove(id);
    }
  }