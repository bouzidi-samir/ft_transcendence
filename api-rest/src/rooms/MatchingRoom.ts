import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import User from '../users/entities/user.entity';
import Game from '../games/game.entity';
import { gameService } from '../games/game.service';
import { UsersService } from "../users/users.service";
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class MatchingRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());
  }

  async onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
   // client.send(this.gameData) data de la partie a afficher
    
  this.onMessage("p2Data", async (client, message) => {
    //this.game.p2_userName = message.p2_userName;
  })

}
  async onLeave (client: Client, consented: boolean) {
    if (this.clients.length > 1)
    {
      if (client == this.clients[0])
      {
        //this.game.winner = this.game.p2_userName;
        this.onDispose();
      }
      else if (client == this.clients[1])
      {
        //this.game.winner = this.game.p1_userName;
        this.onDispose();
      }
    }
    console.log(client.sessionId, "left!");
  }

  async onDispose() {
    console.log("room", this.roomId, "disposing...");
    let request = await fetch("localhost:4000/games/result", {
      method: "POST",
      body: JSON.stringify({
        //game : this.game,
      })
    })
  }

}