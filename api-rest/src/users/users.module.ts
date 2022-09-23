import { Module } from '@nestjs/common';
import User from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relations } from './entities/relations.entity';
import { Rooms } from '../chat/entities/rooms.entity';
import { Messages } from '../chat/entities/messages.entity';

@Module({
  controllers: [UsersController],
	providers: [UsersService],
 	imports: [
		 TypeOrmModule.forFeature([User, Rooms, Messages, Relations])
	],
	exports: [UsersService]
})
export class UsersModule {}
