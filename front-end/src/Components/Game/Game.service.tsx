import { Ball, Player } from './Game.schema';
import * as CONF from './Game.config'

export class GameService {
	myball: Ball  = new Ball(CONF.canvas_width / 2, CONF.canvas_height / 2, 300, 300);
}