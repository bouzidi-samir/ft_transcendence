import { ConsoleLogger } from "@nestjs/common";
import { Room, Client } from "colyseus";
import { Game, players } from "../schema/GameSchema";

var cron = require('node-cron');

export class gameRoom extends Room {
	player1 : players = new players();
	player2: players = new players();
	game : Game;
	my_job : any;
	p1_ping : number = 0;
	p2_ping : number = 0;

	onCreate(options: any){
		this.setState(new Game);
		this.my_job = cron.schedule('*/1 * * * * *', () => {
			setTimeout( () => 
			{
				if(this.clients[0])
				{
					if (this.p1_ping === 0)
					{
						for (let i = 0; i < this.clients.length; i++)
						{
							this.clients[i].send("leaver", {leaver : this.player1.username});
						}
					}
				}
				if (this.clients[1])
				{
					if (this.p2_ping === 0)
					{
						for (let i = 0; i < this.clients.length; i++)
						{
							this.clients[i].send("leaver", {leaver : this.player2.username});
						}
					}
				}
				this.p1_ping = 0;
				this.p2_ping = 0;
			}, 100);
		})
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
		this.onMessage("ballPos", (client, message) => {
			for (let i = 0; i < this.clients.length; i++)
			{
				if (this.clients[i].sessionId != client.sessionId)
					this.clients[i].send("ballPos", {ball_x : message.ball_x, ball_y : message.ball_y});
			}
		});
		this.onMessage("updateScore", (client, message) => {
			for (let i = 0; i < this.clients.length; i++)
			{
				if (this.clients[i].sessionId != client.sessionId)
					this.clients[i].send("updateScore", {player_score : message.player_score, player2_score : message.player2_score});
			}
		});
		this.onMessage("player1_name", (client,message) => {
			this.player1.username = message.player1_username;
		})
		this.onMessage("player2_name", (client,message) => {
			this.player2.username = message.player2_username;
			for (let i = 0; i < this.clients.length; i++)
			{
				this.clients[i].send("players_names", {player_name : this.player1.username, player2_name : this.player2.username});
			}
		})
		this.onMessage("gameEnd", (client, message) => {
			this.player1.score = message.player_score;
			this.player2.score = message.player2_score;
			this.disconnect();
		});
		this.onMessage("pong", (client, message) => {
			if(this.clients[0])
			{
				if (message.id === this.clients[0].sessionId)
					this.p1_ping = 1;
			}
			if(this.clients[1])
			{
				if (message.id === this.clients[1].sessionId)
					this.p2_ping = 1;
			}
		});
	}

	// player qui quitte la room
	onLeave(client: Client, consented?: boolean){
		console.log("client leave " + client.sessionId);
		// permet de detruire la room une fois le player leave
		this.disconnect();
	}

	// effacer les rooms
	async onDispose(){
		//console.log(this.player1.username);
		//console.log(this.player2.username);
		//console.log(this.player1.score);
		//console.log(this.player2.score);
		let request = await fetch("http://localhost:4000/games/result", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'cors': 'true'
			  },
			body: JSON.stringify({
			  player1_username : this.player1.username,
			  player2_username : this.player2.username,
			  player1_score : this.player1.score,
			  player2_score : this.player2.score,
			})
		  })
		this.my_job.stop();
		console.log("room destroy " );

	}
	
}