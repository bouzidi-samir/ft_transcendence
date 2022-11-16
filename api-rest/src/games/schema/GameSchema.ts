import {Schema, type} from "@colyseus/schema";

export class Ball extends Schema {
	@type("number") x: number;
	@type("number") y: number;
	@type("number") velocity_x: number;
	@type("number") velocity_y: number;
}

export class players extends Schema {
	@type('number')
	x: number;
	@type('number')
	y: number;
	@type('number')
	score: number;
	@type('number')
	id: number;
	@type('string')
	username: string;

	constructor(x = 0, y = 0, score = 0, id = 0, userName = "") {
		super();
		this.x = x;
		this.y = y;
		this.score = score;
		this.id = id;
		this.username = userName;}
}

export class Game extends Schema {
	@type(players) playerA = new players();
	@type(players) playerB = new players();
	@type(Ball) ball = new Ball();	
}