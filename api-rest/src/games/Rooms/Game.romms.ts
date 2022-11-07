import { ConsoleLogger } from "@nestjs/common";
import { Room, Client } from "colyseus";
import { Game, players } from "../schema/GameSchema";

export class gameRoom extends Room {
	playerTest: players;

	onCreate(options: any){
		
		this.setState(new Game);
		console.log(options.mode);
	}

	onJoin(client: Client, options?: any){
		this.onMessage("test", (client, message) => {
			console.log(client.sessionId, " join ", message);
		});
		console.log(client.sessionId + " join");
		this.send(client, "client", 1);
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
