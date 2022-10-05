import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Server } from 'colyseus';
import { AppModule } from './app.module';
import { MyRoom } from './rooms/MyRoom';

(async () => {
	const api = await NestFactory.create(AppModule, {
		cors: true
	})

	api.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	const gameServer = new Server();
	gameServer.define('my_room', MyRoom)
	.filterBy(['mode', 'userId']) // rajouter access token
	.enableRealtimeListing()
	.on("create", (room) => console.log("room created:", room.roomId))
	.on("dispose", (room) => console.log("room disposed:", room.roomId))
	.on("join", (room, client) => console.log(client.id, "joined", room.roomId))
	.on("leave", (room, client) => console.log(client.id, "left", room.roomId));
	gameServer.attach({ server: api.getHttpServer() });

	
	api.listen(4000);
})();