import { UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
    WebSocketGateway, SubscribeMessage, MessageBody,  
    OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect,
    WebSocketServer,
    ConnectedSocket, 
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from 'src/auth/jwt-authguards';
import { Repository } from 'typeorm';
  import { ChatService } from './chat.service';
  import { Messages } from './entities/messages.entity';
//   import { CreateChatDto } from './dto/create-chat.dto';
//   import { UpdateChatDto } from './dto/update-chat.dto';
  
  @WebSocketGateway(8000, { cors: '*'})
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly chatService: ChatService) {}
    
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
      console.log('initialized');
    }
    
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
    }
    
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('newMessageClient')
    handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      console.log('Received message in Back', alert);
      this.server.emit('newMessageServer', alert);
    }
    @SubscribeMessage('newNotifClient')
    handleNotif(@ConnectedSocket() client: Socket, @MessageBody()  alertNotif: any): void {
      console.log('Received notif in Back', alertNotif);
      this.server.emit('newNotifServer', alertNotif);
    }
    @SubscribeMessage('messageFromClient')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody()  message: any): void {
      console.log('Received message in Back', message);
      this.server.emit('messageFromServer', message);
      this.chatService.saveMessage(message);

    }
    @SubscribeMessage('newRoomClient')
    handleNewRoom(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      console.log('Received message in Back', alert);
      this.server.emit('newRoomServer', alert);
    }
    
    @SubscribeMessage('newAdmin')
    handleNewAdmin(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      console.log('Received message in Back admin', alert);
      this.server.emit('newAdminServer', alert);
    }

    @SubscribeMessage('newMember')
    handleNewMember(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      console.log('New Member', alert);
      this.server.emit('newMemberServer', alert);
    }

    @SubscribeMessage('findAllChat')
    findAll() {
      return this.chatService.findAll();
    }
  
    @SubscribeMessage('findOneChat')
    findOne(@MessageBody() id: number) {
      return this.chatService.findOne(id);
    }
  
    @SubscribeMessage('removeChat')
    remove(@MessageBody() id: number) {
      return this.chatService.remove(id);
    }

    @SubscribeMessage('invitationGame')
    invitationGame(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      console.log('Received message in Back', alert);
      this.server.emit('invitationGameServer', alert);
    }
    
    @SubscribeMessage('acceptGame')
    acceptGame(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      console.log('Received message in Back', alert);
      this.server.emit('acceptGameServer', alert);
    }

    @SubscribeMessage('refuseGame')
    refuseGame(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      console.log('Received message in Back', alert);
      this.server.emit('refuseGameServer', alert);
    }
    
  }