import { ConsoleLogger } from "@nestjs/common";
import { Room, Client } from "colyseus";
import { Game, players } from "../schema/GameSchema";

var cron = require('node-cron');

export class gameRoom extends Room {
	player1 : players = new players();
	player2: players = new players();
	game : Game;
	my_job : any;
	p1_score : number = 0;
	p2_score : number = 0;
	token : any;

	onCreate(options: any){
		this.setState(new Game);
		this.player1.username = "null";
		this.player2.username = "null";
	}

	async onAuth(client, options, request)
  	{
		this.token = options.access_token;
    	let ret = await fetch("http://localhost:4000/games/checkGuard", {
			method: "POST",
			headers: {
        		'Authorization': `Bearer ${options.access_token}`,
				'Content-Type': 'application/json',
				'cors': 'true'
			  },
		  })
      let response = await ret.json();
      if(response === true)
        return (true);
  }

	onJoin(client: Client, options?: any){

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
		this.onMessage("requestClient", () => {
			console.log("client request");
			client.send("client", {client : client, clientsNb : this.clients.length, player1 : this.player1.username, player2 : this.player2.username});
		})
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
				this.p1_score = message.player_score;
				this.p2_score = message.player2_score;
				if (this.clients[i].sessionId != client.sessionId)
					this.clients[i].send("updateScore", {player_score : message.player_score, player2_score : message.player2_score});
			}
		});

		this.onMessage("player_name", (client,message) => {
			if (this.player1.username === "null")
			{
				this.player1.username = message.player_username;
				client.send("role", {role : "player1", client : client})
			}
			else if (this.player2.username === "null")
			{
				this.player2.username = message.player_username;
				client.send("role", {role : "player2", client : client})
				this.setMetadata({player1 : this.player1.username, player2 : this.player2.username});
			}
			if (this.player1.username != 'null' && this.player2.username != 'null')
			{
				for (let i = 0; i < this.clients.length; i++)
				{
					this.clients[i].send("players_names&scores", {player_name : this.player1.username, player2_name : this.player2.username, p1_score : this.p1_score, p2_score : this.p2_score });
				}
			}
		})

		this.onMessage("gameEnd", (client, message) => {
			this.player1.score = message.player_score;
			this.player2.score = message.player2_score;
			this.disconnect();
		});
		this.onMessage("leaver", (client, message) => {
			if (message.id === this.clients[0].sessionId)
			{
				this.player1.score = -1;
				this.player2.score = message.player2_score;
			}
			else if (message.id === this.clients[1].sessionId)
			{
				this.player2.score = -1;
				this.player1.score = message.player1_score;
			}
			for (let i = 0; i < this.clients.length; i++)
			{
				this.clients[i].send("leaver", {});
			}
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
	async onDispose(){
		//console.log(this.player1.username);
		//console.log(this.player2.username);
		//console.log(this.player1.score);
		//console.log(this.player2.score);
		let request = await fetch("http://localhost:4000/games/result", {
			method: "POST",
			headers: {
				'Authorization': `Bearer ${this.token}`,
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
		console.log("room destroy " );

	}
	
}