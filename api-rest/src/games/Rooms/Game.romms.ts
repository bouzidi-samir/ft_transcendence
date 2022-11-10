import { ConsoleLogger } from "@nestjs/common";
import { Room, Client } from "colyseus";
import { Game, players } from "../schema/GameSchema";

export class gameRoom extends Room {
	player1 : players = new players();
	player2: players = new players();
	game : Game;

	onCreate(options: any){
		
		this.setState(new Game);
		console.log(options.mode);
	}

	onJoin(client: Client, options?: any){
		this.onMessage("test", (client, message) => {
			console.log(client.sessionId, " join ", message);
		});
		client.send("client", {client : client, clientsNb : this.clients.length})
		console.log(client.sessionId + " join");
		this.onMessage("player", (client, message) => {
			for (let i = 0; i < this.clients.length; i++)
			{	
				if (this.clients[i].sessionId != client.sessionId)
					this.clients[i].send("player", {player_y : message.player_y});
			}
		});
		this.onMessage("player2", (client, message) => {
			for (let i = 0; i < this.clients.length; i++)
			{
				if (this.clients[i].sessionId != client.sessionId)
					this.clients[i].send("player2", {player2_y : message.player2_y});
			}
		});
		this.onMessage("gameEnd", (client, message) => {
			console.log(message);
			this.player1.username = message.player_username;
			this.player2.username = message.player2_username;
			this.player1.score = message.player_score;
			this.player2.score = message.player2_score;
			console.log(message);
			this.disconnect();
		});
	}

	// player qui quitte la room
	onLeave(client: Client, consented?: boolean){
		console.log("client leave " + client.sessionId);
		// permet de detruire la room une fois le player leave
		this.disconnect();
	}

	// effacer les rooms
	onDispose(){
		console.log("room destroy " );

	}
	
}
