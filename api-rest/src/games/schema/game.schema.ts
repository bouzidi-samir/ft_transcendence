import {Schema, type} from "@colyseus/schema";

export class Bowl extends Schema {
	@type("number") x: number;
	@type("number") y: number;
	@type("number") velocity: number;

}