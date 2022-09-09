import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
  //  ConfigModule.forRoot({ isGlobal:true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
			host: 'localhost',
			port: 5400,
			//username: 'user',
			//password: 'postgres',
			database: 'master-pong',
      autoLoadEntities: true,
			entities: ["dist/entities/*.entity.js"],
      synchronize: true,
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
