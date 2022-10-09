import {Schema, type} from "@colyseus/schema";

export class Bowl extends Schema {
	@type("number") x: number;
	@type("number") y: number;
	@type("number") velocity: number;

}

export class players extends Schema {
	@type("number") x: number;
	@type("number") y: number;
}

export class MyRoomState extends Schema {
	@type(players) playerA = new players();
	@type(players) playerB = new players();	
}

