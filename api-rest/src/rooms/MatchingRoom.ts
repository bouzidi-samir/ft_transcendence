import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import User from '../users/entities/user.entity';
import Game from '../games/game.entity';
import { gameService } from '../games/game.service';
import { UsersService } from "../users/users.service";
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { timingSafeEqual } from "crypto";

export class MatchingRoom extends Room<MyRoomState> {


  clientsEllo : number[];

  onCreate (options: any) {
    this.setState(new MyRoomState());
  }

  async onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
   // client.send(this.gameData) data de la partie a afficher
    
    this.onMessage("clientEllo", async (client, message) => {
      let ello = parseInt(message.ello);
      this.clientsEllo.push(parseInt(message.ello));
      for (let j = 0 ; j < this.clients.length -1 ; j++)
      {
        if ((this.clientsEllo[j] - ello >= -50) && (this.clientsEllo[j] - ello <= 50))
          client.send("matchFound", {});
          this.clients[j].send("matchFound", {})
          this.clientsEllo.splice(j);
          this.clientsEllo.pop();
          this.clients[j].leave();
          client.leave();
      }
    })
  }

  async onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  async onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}