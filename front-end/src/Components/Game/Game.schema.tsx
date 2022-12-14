import {Schema, type} from "@colyseus/schema";

export class Ball extends Schema {
	@type('number')
	x: number;
	@type('number')
	y: number;
	@type('number')
	velocity_x: number;
	@type('number')
	velocity_y: number;
  
	constructor(x = 0, y = 0, velocity_x =0, velocity_y = 0) {
	  super();
	  this.x = x;
	  this.y = y;
	  this.velocity_x = velocity_x;
	  this.velocity_y =- velocity_y;
	}
  }
  
  export class Player extends Schema {
	@type('number')
	x: number;
	@type('number')
	y: number;
	@type('number')
	score: number;
	@type('number')
	id: number;
	@type ('string')
	userName : string;
	@type ('string')
	nickname : string;
	@type ('string')
	color : string;
  
	constructor(x = 0, y = 0, score = 0, id = 0, userName = "", nickname = "", color = "white") {
	  super();
	  this.x = x;
	  this.y = y;
	  this.score = score;
	  this.id = id;
	  this.userName = userName;
	  this.nickname = nickname;
	  this.color = color;
	}
  }

  export class Computer extends Schema {
	@type('number')
	x: number;
	@type('number')
	y: number;
	@type('number')
	score: number;
  
	constructor(x = 0, y = 0, score = 0) {
	  super();
	  this.x = x;
	  this.y = y;
	  this.score = score;
	}
  }