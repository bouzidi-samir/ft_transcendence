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

  ello_list : string [];
  new_ello : string;

  onCreate (options: any) {
    this.setState(new MyRoomState());
  }

  async onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.onMessage("new", (client, message) => {
      this.ello_list.push(message.ello);
      this.new_ello = message.ello;
    })
    for (let i = 0; i < this.ello_list.length; i++)
    {
      
    }
  }

  async onLeave (client: Client, consented: boolean) {
   
    console.log(client.sessionId, "left!");
  }

  async onDispose() {
    console.log("room", this.roomId, "disposing...");

  }

}