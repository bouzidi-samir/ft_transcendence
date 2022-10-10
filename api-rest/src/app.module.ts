import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
			 host: 'localhost',
     // host: 'postgres-db',
			port: 5432,
			//username: 'user',
			//password: 'password',
			database: 'master-pong',
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
