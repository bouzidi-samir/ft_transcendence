import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import User from '../users/entities/user.entity';
import Game from '../games/entities/game.entity';
import { gameService } from '../games/game.service';
import { UsersService } from "../users/users.service";
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import fetch from 'node-fetch';

export class PrivateRoom extends Room<MyRoomState> {

  gameId : number;
  leaversNb : number = 0;
  onCreate (options: any) {
    this.setState(new MyRoomState());
  }

  async onAuth(client, options, request)
  {
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

  async onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
   // client.send(this.gameData) data de la partie a afficher

    this.onMessage("gameId", (client, message) =>{
      this.gameId = message.id;
      this.clients[1].send("joinRoom", {id : this.gameId});
    })

    if (this.clients.length === 2)
    {
      this.clients[0].send("createRoom", {});
    }
  }

  async onLeave (client: Client, consented: boolean) {
    this.leaversNb += 1;
    if(this.leaversNb === 2)
    {
      this.disconnect();
    }
  }

  async onDispose() {

  }

}