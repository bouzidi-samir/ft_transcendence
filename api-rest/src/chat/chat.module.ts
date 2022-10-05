import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relations} from '../users/entities/relations.entity';
import User from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Member } from './entities/member.entity';
import { Messages } from './entities/messages.entity';
import { Rooms } from './entities/rooms.entity';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway], 
  imports: [
    TypeOrmModule.forFeature([Rooms, Messages, User, Relations, Member]), 
 ],
 exports: [ChatService]

})
export class ChatModule {}