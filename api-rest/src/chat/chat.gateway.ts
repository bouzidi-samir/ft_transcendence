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
    }
    
    handleConnection(client: Socket, ...args: any[]) {
    }
    
    handleDisconnect(client: Socket) {
    }

    @SubscribeMessage('newMessageClient')
    handleNewMessage(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      this.server.emit('newMessageServer', alert);
    }
    @SubscribeMessage('newNotifClient')
    handleNotif(@ConnectedSocket() client: Socket, @MessageBody()  alertNotif: any): void {
      this.server.emit('newNotifServer', alertNotif);
    }
    @SubscribeMessage('messageFromClient')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody()  message: any): void {
      this.server.emit('messageFromServer', message);
      this.chatService.saveMessage(message);

    }
    @SubscribeMessage('newRoomClient')
    handleNewRoom(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      this.server.emit('newRoomServer', alert);
    }
    
    @SubscribeMessage('newAdmin')
    handleNewAdmin(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      this.server.emit('newAdminServer', alert);
    }

    @SubscribeMessage('newMember')
    handleNewMember(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
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

    @SubscribeMessage('banned')
    handleBanned(@ConnectedSocket() client: Socket,@MessageBody() alert: any) : void {
      this.server.emit('bannedServer', alert);
    }

    @SubscribeMessage('invitationGame')
    invitationGame(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      this.server.emit('invitationGameServer', alert);
    }
    
    @SubscribeMessage('acceptGame')
    acceptGame(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      this.server.emit('acceptGameServer', alert);
    }

    @SubscribeMessage('refuseGame')
    refuseGame(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      this.server.emit('refuseGameServer', alert);
    }

    @SubscribeMessage('roomInvitation')
    roomInvitation(@ConnectedSocket() client: Socket, @MessageBody()  alert: any): void {
      this.server.emit('roomInvitationServer', alert);
    }
    
  }