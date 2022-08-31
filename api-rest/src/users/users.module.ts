import { Module } from '@nestjs/common';
import User from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
	providers: [UsersService],
 	imports: [
		 TypeOrmModule.forFeature([User])
	],
	exports: [UsersService]
})
export class UsersModule {}
