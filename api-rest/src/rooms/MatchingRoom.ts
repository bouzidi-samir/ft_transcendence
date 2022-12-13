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

export class MatchingRoom extends Room<MyRoomState> {
  clientsEllo : number[] = [];

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
    
    this.onMessage("clientEllo", async (client, message) => {
      let ello = parseInt(message.ello);
      this.clientsEllo.push(parseInt(message.ello));
      for (let j = 0 ; j < (this.clients.length -1) ; j++)
      {
        if ((this.clientsEllo[j] - ello >= -50) && (this.clientsEllo[j] - ello <= 50))
          client.send("createRoom", {});
          this.onMessage("room_id", async(client, message) =>
          {
            console.log(message.id);
            this.clients[j].send("joinRoom", {id : message.id});
          })
      }
    })
  }

  async onLeave (client: Client, consented: boolean) {
   for (let j = 0; j < this.clientsEllo.length; j++)
   {
     if (this.clients[j] === client)
        this.clientsEllo.splice(j);
   }
    console.log(client.sessionId, "left!");
  }

  async onDispose() {
    console.log("room", this.roomId, "disposing...");

  }

}