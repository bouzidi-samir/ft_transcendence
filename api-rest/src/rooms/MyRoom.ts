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
  game : Game;
  player1 : User;
  player2 : User;
  //faire un auth avec le jwttoken verif

  onCreate (options: any) {
    this.setState(new MyRoomState());
    this.game = new Game;
  }

  
  async onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
   // client.send(this.gameData) data de la partie a afficher
    client.send("clientsNb", {clientsNb :this.clients.length});
    
  this.onMessage("p1Data", async (client, message) => {
      this.game.p1_userName = message.p1_userName;
      this.game.p1_score = message.p1_score;
      this.player1 = await this.userService.getUserByUsername(message.p1_username);
      console.log(this.player1);
  })
    
  this.onMessage("p2Data", async (client, message) => {
    this.game.p2_userName = message.p2_userName;
    this.game.p2_score = message.p2_score;
    this.player2 = await this.userService.getUserByUsername(message.p2_username);
  })

  this.onMessage("p1", (client, message) => 
  {
   //console.log(this.player1);
  })
}

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  async onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
