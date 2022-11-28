import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Server } from 'colyseus';
import { AppModule } from './app.module';
import { gameRoom } from './games/Rooms/Game.romms';
import { MyRoom } from './rooms/MyRoom';
import { MatchingRoom } from './rooms/MatchingRoom';
import {PrivateRoom} from './rooms/PrivateRoom';

(async () => {
	const api = await NestFactory.create(AppModule, {
		cors: { credentials:true, origin: `http://10.13.2.6:3000`}
	});

	api.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	const gameServer = new Server();
	gameServer.define('my_room', gameRoom)
	.filterBy(['mode', 'userId']) // rajouter access token
	.enableRealtimeListing()
	.on("create", (room) => console.log("room created:", room.roomId))
	.on("dispose", (room) => console.log("room disposed:", room.roomId))
	.on("join", (room, client) => console.log(client.id, "joined", room.roomId))
	.on("leave", (room, client) => console.log(client.id, "left", room.roomId));

	
	gameServer.define('matching_room', MatchingRoom)
	.filterBy(['userId']) // rajouter access token
	.enableRealtimeListing()
	.on("create", (room) => console.log("room created:", room.roomId))
	.on("dispose", (room) => console.log("room disposed:", room.roomId))
	.on("join", (room, client) => console.log(client.id, "joined", room.roomId))
	.on("leave", (room, client) => console.log(client.id, "left", room.roomId));

	gameServer.define('private_room', PrivateRoom)
	.filterBy(['userId']) 
	.enableRealtimeListing()
	.on("create", (room) => console.log("room created:", room.roomId))
	.on("dispose", (room) => console.log("room disposed:", room.roomId))
	.on("join", (room, client) => console.log(client.id, "joined", room.roomId))
	.on("leave", (room, client) => console.log(client.id, "left", room.roomId));
	gameServer.attach({ server: api.getHttpServer() });

	api.listen(4000);
})();