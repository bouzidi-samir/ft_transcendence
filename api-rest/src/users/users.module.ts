import { Module } from '@nestjs/common';
import User from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/chat/entities/room.entity';
import { Messages } from 'src/chat/entities/messages.entity';
import { Status } from './entities/status.entity';
import { Relatives } from './entities/relatives.entity';

@Module({
  controllers: [UsersController],
	providers: [UsersService],
 	imports: [
		 TypeOrmModule.forFeature([User, Room, Messages, Status, Relatives])
	],
	exports: [UsersService]
})
export class UsersModule {}
