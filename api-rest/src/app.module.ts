import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { join } from 'path';
import { gameModule } from './games/game.module';

@Module({
  imports: [
   ConfigModule.forRoot({ isGlobal:true }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: parseInt(configService.get('DATABASE_PORT')),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_DB'),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: true,
      })}),
    UsersModule,
    AuthModule,
    ChatModule,
    gameModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
