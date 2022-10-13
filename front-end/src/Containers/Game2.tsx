import { Ball, Player, Computer } from '../Components/Game/Game.schema';
import { useEffect, useRef } from "react";
import * as setting_game from "../Components/Game/Game.config";
import * as Colyseus from "colyseus.js";
import "../styles/Containers/Game.css";
import Navbar from '../Components/Share/Navbar';

export default function Game2() {
	// setup client
	var client = new Colyseus.Client('ws://localhost:4000');
	let clientsNb;

	// setup game
	let canvas:any;
	let context:any;
	let computer:Computer;
	let ball: Ball;
	let player:Player;

	function collide(player:any) {
    // The player does not hit the ball
    if (ball.y < player.y || ball.y > player + setting_game.paddle_height) {
        // Set ball and players to the center
        ball.x = canvas.width / 2;
    	ball.y = canvas.height / 2;
        player.y = canvas.height / 2 - setting_game.paddle_height / 2;
        computer.y = canvas.height / 2 - setting_game.paddle_height / 2;
        
        // Reset speed
        ball.velocity_x = 2;
    } else {
        // Increase speed and change direction
        ball.velocity_x *= -1.2;
    }
}

	function ballMove() {
		if (ball.y > canvas.height || ball.y < 0) {
			ball.velocity_y *= -1;
		}
		if (ball.x > canvas.width - setting_game.paddle_width) {
			collide(computer.y);
		} else if (ball.x < setting_game.paddle_width) {
			collide(player.y);
		}
		ball.x += ball.velocity_x;
		ball.y += ball.velocity_y;
	}

	function computerMove() {
		computer.y += ball.velocity_y * 0.85;
	}

	function playerMove(event: MouseEvent) {
		// Get the mouse location in the canvas
		var canvasLocation = canvas.getBoundingClientRect();
		var mouseLocation = event.clientY - canvasLocation.y;
		if (mouseLocation < setting_game.paddle_height / 2) {
			player.y = 0;
		} else if (mouseLocation > canvas.height - setting_game.paddle_height / 2) {
			player.y = canvas.height - setting_game.paddle_height;
		} else {
			player.y = mouseLocation - setting_game.paddle_height / 2;
		}
		player.y = mouseLocation - setting_game.paddle_height / 2;
	}

	function play() {
		draw();
		computerMove();
		ballMove();
		requestAnimationFrame(play);
	}

	function draw() {
		context = canvas.getContext('2d');
		// Draw field
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);
		// Draw middle line
		context.strokeStyle = 'white';
		context.beginPath();
		context.moveTo(canvas.width / 2, 0);
		context.lineTo(canvas.width / 2, canvas.height);
		context.stroke();

		// draw paddle_player

		context.fillStyle = 'white';
		context.fillRect(player.x, player.y, setting_game.paddle_width, setting_game.paddle_height);
		context.fillRect(computer.x, computer.y, setting_game.paddle_width, setting_game.paddle_height);

		//draw ball

		context.beginPath(); // permet d'effacer tout les tracages possible pour n'avoir qu'une balle
		context.fillStyle = 'white';
		context.arc(ball.x , ball.y, setting_game.ball_raduis, 0, Math.PI * 2, false);
		context.fill(); // permet de dessiner l'interieure
	}
	document.addEventListener('DOMContentLoaded', function () {
		canvas = document.getElementById('canvas');
		player = new Player(0, canvas.height / 2 - setting_game.paddle_height / 2);
		computer = new Computer(canvas.width - setting_game.paddle_width, canvas.height / 2 - setting_game.paddle_height / 2);
		ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 2);
		draw();
		play();
		// Mouse move event
		canvas.addEventListener('mousemove', playerMove);
	});

// 	const connect = async () => {
// 		const room = await client.joinOrCreate("my_room", {mode: "single", })	
// 		if (room) {	
// 		// room.onStateChange((newState:any) => {// verification des updates
// 		// });

// 		room.onMessage("clientsNb", (message) => {	
// 			clientsNb = message.clientsNb;
// 		});
// 	}
// }

// 	useEffect(() => {
// 		connect();
// 	}, [])
	return (
		<>
		<Navbar/> 
			<head>
				<title>Rétro game - Pong</title>
			</head>
			<body>
			<h1>Pong</h1>
			<main>
				<canvas className="gameCanvas" id="canvas" width="640" height="480"></canvas>
			</main>
			</body>
		</>
	)
}