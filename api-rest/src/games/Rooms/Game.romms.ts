import { ConsoleLogger } from "@nestjs/common";
import { Room, Client } from "colyseus";
import { Game, players } from "../schema/GameSchema";
import fetch from 'node-fetch';

var cron = require('node-cron');

export class gameRoom extends Room {
	player1 : players = new players();
	player2: players = new players();
	p1_nick : string = "";
	p2_nick :string = "";
	game : Game;
	my_job : any;
	p1_score : number = 0;
	p2_score : number = 0;
	p1_color : string = "white";
	p2_color : string = "white";
	p1_id : string = "";
	p2_id : string = "";
	token : any;
	finished : number = 0;

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
				this.clients[i].send("updateScore", {player_score : message.player_score, player2_score : message.player2_score});
			}
		});

		this.onMessage("player_name", (client,message) => {
			if (this.player1.username === "null")
			{
				this.player1.username = message.player_username;
				this.p1_nick = message.player_nick;
				this.p1_color = message.color;
				this.p1_id = client.sessionId;
				client.send("role", {client : client.sessionId})
			}
			else if (this.player2.username === "null")
			{
				this.player2.username = message.player_username;
				this.p2_nick = message.player_nick
				this.p2_color = message.color;
				this.p2_id = client.sessionId;
				client.send("role", {client : client.sessionId})
				this.setMetadata({player1 : this.p1_nick, player2 : this.p2_nick});
			}
			else
			{
				client.send("role", {client : client.sessionId})
			}
			if (this.player1.username != 'null' && this.player2.username != 'null')
			{
				for (let i = 0; i < this.clients.length; i++)
				{
					this.clients[i].send("players_names&scores", {player_name : this.player1.username, player2_name : this.player2.username, p1_score : this.p1_score, p2_score : this.p2_score, p1_nick : this.p1_nick, p2_nick : this.p2_nick, p1_color : this.p1_color, p2_color : this.p2_color, p1_id : this.p1_id, p2_id : this.p2_id });
				}
			}
		})

		this.onMessage("gameEnd", (client, message) => {
			this.player1.score = message.player_score;
			this.player2.score = message.player2_score;
			this.finished = 1;
		});
		
		this.onMessage("leaver", (client, message) => {
			this.finished = 1;
				if (client.sessionId === this.p1_id)
				{
					this.player1.score = -1;
					this.player2.score = message.player2_score;
					for (let i = 0; i < this.clients.length; i++)
					{
						this.clients[i].send("leaver", {});
					}
				}
				else if (client.sessionId === this.p2_id)
				{
					this.player2.score = -1;
					this.player1.score = message.player1_score;
					for (let i = 0; i < this.clients.length; i++)
					{
						this.clients[i].send("leaver", {});
					}
				}
		});
	}

	// player qui quitte la room
	onLeave(client: Client, consented?: boolean){
	if(this.finished === 0)
	{
		if (client.sessionId === this.p1_id)
		{
			this.player1.score = -1;
			for (let i = 0; i < this.clients.length; i++)
			{
				this.clients[i].send("leaver", {});
			}
			this.finished = 1;
		}
		else if (client.sessionId === this.p2_id)
		{
			this.player2.score = -1;
			for (let i = 0; i < this.clients.length; i++)
			{
				this.clients[i].send("leaver", {});
			}
			this.finished = 1;
		}
	}
	}

	// effacer les rooms
	async onDispose(){
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
	}
	
}