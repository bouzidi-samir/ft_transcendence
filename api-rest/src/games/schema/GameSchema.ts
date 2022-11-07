import {Schema, type} from "@colyseus/schema";

export class Ball extends Schema {
	@type("number") x: number;
	@type("number") y: number;
	@type("number") velocity_x: number;
	@type("number") velocity_y: number;
}

export class players extends Schema {
	@type("number") x: number;
	@type("number") y: number;
}

export class Game extends Schema {
	@type(players) playerA = new players();
	@type(players) playerB = new players();
	@type(Ball) ball = new Ball();	
}