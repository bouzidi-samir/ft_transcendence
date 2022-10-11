import "../styles/Containers/Game.css";
import { useEffect, useRef } from "react";
import * as Colyseus from "colyseus.js";
import { Ball, Player } from '../Components/Game/Game.schema';
import * as setting_game from "../Components/Game/Game.config";

	export default function Game() {
		let myball: Ball  = new Ball(setting_game.canvas_width / 2, setting_game.canvas_height / 2, 300, 300);
		let paddle: Player = new Player(0, setting_game.player_y);
		var client = new Colyseus.Client('ws://localhost:4000');
		// let player: schema.players;
		// let gameData: any;
		let clientsNb;
		const canvasRef = useRef<HTMLCanvasElement | null>(null);
		const connect = async () => {
			const room = await client.joinOrCreate("my_room", {mode: "single", })	
			if (room){
				console.log("3")		
			//	let ball = null;
				// room.onStateChange((newState:any) => {// verification des updates
				// });

			room.onMessage("clientsNb", (message) => {
				console.log("1")		
				clientsNb = message.clientsNb;
			});

			// room.onMessage("ball", (message) => {
			// 	ball = message.ball;
			// 	console.log(ball);
			// });

			// room.onMessage("player", (message) => {
			// 	player = message.player;
			// 	console.log(player);
			// });

		}
	}

	const resetCanvas = () => {
        let canvas = canvasRef.current;
		let canvasSize = {width: 1080, height: 860};
		 
        if (canvas){
            const context = canvas.getContext("2d");
			canvas.width = 1080;
			canvas.height = 860;
            if (context){
               context.fillStyle = "transparent";
				context.fillRect(0, 0, canvas.width, canvas.height);

				// draw paddle_player

				context.fillStyle = 'white';
				context.fillRect(paddle.x, paddle.y, setting_game.paddle_width, setting_game.paddle_height);
				context.fillRect(setting_game.canvas_width - setting_game.paddle_width, setting_game.player_y, setting_game.paddle_width, setting_game.paddle_height);

				//draw ball

				context.beginPath(); // permet d'effacer tout les tracages possible pour n'avoir qu'une balle
				context.fillStyle = 'white';
				context.arc(myball.x , myball.y - 45, setting_game.ball_raduis, 0, Math.PI * 2, false);
				context.fill(); // permet de dessiner l'interieure
				
				
			}
        }
}
	const display = () => {
        resetCanvas();
		// if (myball.x == setting_game.canvas_width)
		// 	i = -20;
		// if (myball.x == 0)
		// 	i = 20;
		// myball.x += i;
		paddle.y +=2;

        requestAnimationFrame(display);
    }

	useEffect(() => {
		connect();
		display();
	  }, [])
	return(
		<>
		<div className="visual">
			{/* <button onClick={Game}>play</button> */}
   			<canvas className="gameCanvas" id="canvas" contentEditable={true} ref={canvasRef}/>
		</div>
		{/* <div onClick={() => {connect()}}> connect</div> */}
		</>
	)
}

 