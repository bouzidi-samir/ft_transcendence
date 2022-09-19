import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relatives } from '../users/entities/relatives.entity';
import { Status } from '../users/entities/status.entity';
import User from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { ChatService } from './chat.service';
import { Messages } from './entities/messages.entity';
import { Room } from './entities/room.entity';

@Module({
  providers: [ChatService], 
  imports: [
    TypeOrmModule.forFeature([Room, Messages, User, Status, Relatives]), 
 ],
 exports: [ChatService]

})
export class ChatModule {}