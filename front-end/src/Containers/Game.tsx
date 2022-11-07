import "../styles/Containers/Game.css";
import { KeyboardEvent, useEffect, useRef } from "react";
import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";
import { Ball, Player, Computer } from '../Components/Game/Game.schema';
import * as setting_game from "../Components/Game/Game.config";
import Navbar from "../Components/Share/Navbar";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

  

var client = new Colyseus.Client('ws://localhost:4000');

let clientsNb;

export default function Game() {
	let client: Client;
	let canvas : any;
	let ball : Ball;
	let player : Player;
	let player2 : Player;
	let computer : Computer;
	let context : any;

	const connect = async () => {
		
		const room = await client?.joinOrCreate("my_room", {mode: "single", });
		if (room)
		{
			room.onMessage("client", (message) => {
				client = message;
				console.log(client);
			});
		}
	}

	const draw = () => {
			
		context = canvas.getContext("2d");
		canvas.width = canvas.width;
		canvas.height = canvas.height;
		context.fillStyle = "transparent";
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "green";
		context.font = "30px Arial";
		context.fillText("0", canvas.width / 4, canvas.height / 2);

		context.fillStyle = "red";
		context.font = "30px Arial";
		context.fillText("1", 3 * canvas.width / 4, canvas.height / 2);

				// draw paddle_player

		context.fillStyle = 'white';
		context.fillRect(player.x, player.y, setting_game.paddle_width, setting_game.paddle_height);
		context.fillRect(player2.x, player2.y, setting_game.paddle_width, setting_game.paddle_height);

				//draw ball

		context.beginPath(); // permet d'effacer tout les tracages possible pour n'avoir qu'une balle
		context.fillStyle = 'white';
		context.arc(ball.x , ball.y, setting_game.ball_raduis, 0, Math.PI * 2, false);
		context.fill(); // permet de dessiner l'interieure	
		
				//draw line
			
		context.strokeStyle = 'white';
		context.beginPath();
		context.moveTo(canvas.width / 2, 0);
		context.lineTo(canvas.width / 2, canvas.height);
		context.stroke();
	}
		// L’évènement DOMContentLoaded est émis lorsque le document HTML initial a été complètement chargé et analysé
	document.addEventListener('DOMContentLoaded', function () // latence a gerer
	{
		
		canvas = document.getElementById('canvas');
		player = new Player(0, setting_game.player_y, 0);
		player2 = new Player(canvas.width - setting_game.paddle_width, setting_game.player_y, 0);
		ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 2);
		canvas.addEventListener('mousemove', playerMove);
		//canvas.addEventListener('keymove', playerKeyMove);
		draw();
		display();
	});

	document.addEventListener('keypress', (event) => 
	{
		const nomTouche = event.key;
		console.log(nomTouche);
	});
	
		// permet de bouger les payers avec la souris 
	function playerMove(event: MouseEvent) {

		var canvasLocation = canvas.getBoundingClientRect();
		var mouseLocation = event.clientY - canvasLocation.y;
		player.y = mouseLocation - setting_game.paddle_height / 2;

		// permet de limiter les players par rapport a la taille du canvas
		if (mouseLocation < setting_game.paddle_height / 2) {
			player.y = 0;
		} else if (mouseLocation > canvas.height - setting_game.paddle_height / 2) {
			player.y = canvas.height - setting_game.paddle_height;
		} else {
			player.y = mouseLocation - setting_game.paddle_height / 2;
		}
	}


		// mouvrement du coomputer
		// function computerMove() 
		// {
		// 	computer.y += ball.velocity_y * 0.85;
		// }

	function collide(playerCurrent: Player) {
		// The player does not hit the ball
		if (ball.y < playerCurrent.y || ball.y > playerCurrent.y + setting_game.paddle_height)
		{
			// Set ball and players to the center
			ball.x = canvas.width / 2;
			ball.y = canvas.height / 2;
			// player.y = canvas.height / 2 - setting_game.paddle_height / 2;
			// player2.y = canvas.height / 2 - setting_game.paddle_height / 2;
			
			// Reset speed
			ball.velocity_x = 5;
			ball.velocity_y = 1;
		}
		else 
		{
			// Increase speed and change direction
			ball.velocity_x *= -1.2;
		}
	}

		// gestion de la balle contre les murs
	function ballMove() {

		// gestion collision haut et bas 
		if (ball?.y > canvas.height || ball?.y < 0) {
			ball.velocity_y *= -1;
		}
		if (ball?.x > canvas.width - setting_game.paddle_width) {
			collide(player2);
		} else if (ball?.x < setting_game.paddle_width) {
			collide(player);
		}
		ball.x += ball.velocity_x;
		ball.y += ball.velocity_y;
	}



	const display = () => {

		ballMove();
		//computerMove();
		draw();
		requestAnimationFrame(display);
	}

	useEffect(() => {
		connect();
		display();
		}, []);

	return(
		<>
		<Navbar/>
		<div className="visual">
			<div>
				<div className="scorePlayer1">joueur 1: {}0</div>
				<div className="scorePlayer2">joueur 2: {}0</div>
				<canvas className="gameCanvas" id="canvas" width='680' height='450'/>
			</div>
		</div>
		</>
	)
}

 	//const canvasRef = useRef<HTMLCanvasElement | null>(null);
	//let canvas = canvasRef.current;
	
	// 	const connect = async () => {
	// 		const room = await client.joinOrCreate("my_room", {mode: "single", })	
	// 		if (room){
	// 			console.log("3")		
	// 		// room.onStateChange((newState:any) => {// verification des updates
	// 		// });

	// 		room.onMessage("clientsNb", (message) => {
	// 			console.log("1")		
	// 			clientsNb = message.clientsNb;
	// 		});
	// 	}
	// }

