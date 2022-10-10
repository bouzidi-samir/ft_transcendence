import { connect } from "react-redux";
import "../styles/Containers/Game.css";
import { Client } from "colyseus.js";
import { useEffect, useRef } from "react";
import { parseConfigFileTextToJson, textSpanContainsTextSpan } from "typescript";
import * as setting_game from "../Components/Game/Game.config";
import { disableFragmentWarnings } from "@apollo/client";
import { gameService} 333

export default function Game() {
	const client = new Client("127.0.0.1:4000");
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const connect = async () => {		
		const room = await client.create("my_room");
		if (room){
			room.onStateChange((newState:any) => {
				console.log(newState);
			 });
			}
	}

	const resetCanvas = () => {
        let canvas = canvasRef.current;
		let canvasSize = {width: 1080, height: 860};
		let ball_x = setting_game.canvas_width / 2;
		let ball_y = setting_game.canvas_height / 2;
        if (canvas){
            const context = canvas.getContext("2d");
			canvas.width = 1080;
			canvas.height = 860;
            if (context){
               context.fillStyle = "transparent";
				context.fillRect(0, 0, canvas.width, canvas.height);

				// draw paddle_player

				context.fillStyle = 'white';
				context.fillRect(0, setting_game.player_y, setting_game.paddle_width, setting_game.paddle_height);
				context.fillRect(setting_game.canvas_width - setting_game.paddle_width, setting_game.player_y, setting_game.paddle_width, setting_game.paddle_height);

				//draw ball

				context.beginPath(); // permet d'effacer tout les tracages possible pour n'avoir qu'une balle
				context.fillStyle = 'white';
				context.arc(ball_x , ball_y - 45, setting_game.ball_raduis, 0, Math.PI * 2, false);
				context.fill(); // permet de dessiner l'interieure
				console.log(ball_x);
				
			}
        }
}
	const display = () => {
        // resetCanvas(); 
        requestAnimationFrame(display);
    }

	useEffect(() => {
		resetCanvas(); 
		display();
	  })
	return(
		<>
		<div className="visual">
   			<canvas className="gameCanvas" id="canvas" contentEditable={true} ref={canvasRef}/>
		</div>
		<div onClick={() => {connect()}}> connect</div>
		</>
	)
}
 