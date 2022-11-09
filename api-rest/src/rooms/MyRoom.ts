import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import User from '../users/entities/user.entity';
import Game from '../games/game.entity';
import { gameService } from '../games/game.service';
import { UsersService } from "../users/users.service";
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class MyRoom extends Room<MyRoomState> {

  constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>
	) {super();}

  @Inject(gameService)
	private gameService: gameService;

  @Inject(UsersService)
  private userService: UsersService;

  gameData = null;
  player1 : User;
  player2 : User;
  game : Game;
  //faire un auth avec le jwttoken verif

  onCreate (options: any) {
    this.setState(new MyRoomState());
    this.game = new Game;
  }

  async onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
   // client.send(this.gameData) data de la partie a afficher
   
   //client.send("clientsNb", {clientsNb :this.clients.length});
   
   //client.send("gameData", {gameData: this.gameData});

	client.send("client", {client : client, clientsNb : this.clients.length})
  this.onMessage("p1Data", async (client, message) => {
      this.game.p1_userName = message.p1_userName;
  })
    
  this.onMessage("p2Data", async (client, message) => {
    this.game.p2_userName = message.p2_userName;
  })

  this.onMessage("keyDown", async (client, message) => {
    console.log('here');
    if (this.game.p1_userName == message.userName)
    {
      //faire les changements sur le gamedata.
    }
    else if (this.game.p2_userName == message.userName)
    {
      //faire les changements sur le gamedata.
    }
  })
  
  this.onMessage("keyUp", async (client, message) => {
    if (this.game.p1_userName == message.userName)
    {
      //faire les changements sur le gamedata.
    }
    else if (this.game.p2_userName == message.userName)
    {
      //faire les changements sur le gamedata.
    }
  })

  this.onMessage("winner", async (client, message) => {
    this.game.winner = message.userName;
    this.onDispose();
  })


}

  async onLeave (client: Client, consented: boolean) {
    if (this.clients.length > 1)
    {
      if (client == this.clients[0])
      {
        this.game.winner = this.game.p2_userName;
        this.disconnect();
      }
      else if (client == this.clients[1])
      {
        this.game.winner = this.game.p1_userName;
        this.disconnect();
      }
    }
    console.log(client.sessionId, "left!");
  }

  async onDispose() {
    console.log("room", this.roomId, "disposing...");
    let request = await fetch("localhost:4000/games/result", {
      method: "POST",
      body: JSON.stringify({
        game : this.game,
      })
    })
  }

}
