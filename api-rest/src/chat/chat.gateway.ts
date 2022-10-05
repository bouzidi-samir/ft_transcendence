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

    afterInit(server: Server) {
      // throw new Error('Method not implemented.');
      console.log('initialized');
    }
    
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
  
      // throw new Error('Method not implemented.');
    }
    
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
  
      // throw new Error('Method not implemented.');
    }

  
    @SubscribeMessage('messageFromClient')
    handleMessage(client: Socket, @MessageBody()  message: any): void {
      console.log('Received message in Back', message);
      this.server.emit('messageFromServer', message);
    //   socket?.emit("messageFromClient", messageData.name, ' ', messageData.time, ' ', messageData.text)

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