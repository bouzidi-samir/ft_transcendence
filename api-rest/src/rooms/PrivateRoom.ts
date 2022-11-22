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
  clientsEllo : number[] = [];

  onCreate (options: any) {
    this.setState(new MyRoomState());
  }

  async onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
   // client.send(this.gameData) data de la partie a afficher

    this.onMessage("clientName", (client, message) => {
        this.setMetadata({ player1: message.player1});
    })

    this.onMessage("joined", (client, message) =>{
      this.clients[0].send("createRoom", {});
    })

    this.onMessage("gameId", (client, message) =>{
      this.clients[1].send("joinRoom", {id : message.id});
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