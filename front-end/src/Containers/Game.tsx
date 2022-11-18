import "../styles/Containers/Game.css";
import { KeyboardEvent, useEffect, useRef, useState, useMemo } from "react";
import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";
import { Ball, Player, Computer } from '../Components/Game/Game.schema';
import * as setting_game from "../Components/Game/Game.config";
import Navbar from "../Components/Share/Navbar";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { wait } from "@testing-library/user-event/dist/utils";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createImportSpecifier } from "typescript";
import { useSearchParams } from "react-router-dom";


let clientsNb;

export default function Game() {
	// const [p1_score, setp1_score] = useState(0);
	// const [p2_score, setp2_score] = useState(0);
	const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const user_id = useParams();
    const [user, setUser]  = useState(User);
	const score = [0, 0];
	const [connected, setConnect] = useState(0);
	const result = useMemo(() => Math.random(), []);
	let navigation = useNavigate();
	const [fortyTwo, setFortyTwo] = useState(false);
	const [params] = useSearchParams();

	

	let client: Client = new Colyseus.Client('ws://localhost:4000');
	let clientId : number;
	let canvas : any = useRef(null);
	let ball : Ball;
	let player : Player;
	let player2 : Player;
	//let computer : Computer;
	let context : any;
	let room : Colyseus.Room<unknown>;
	let animationRequest: number;


	/*var unload = require('unload');
	unload.add(function(){
    	console.log('Ouch, I\'m dying.');
	}); // detecte si un user quitte la page.
	if (window.performance && window.performance.navigation.type == window.performance.navigation.TYPE_BACK_FORWARD) {
		alert('Ouch, Im dying.');
	} // detecte si un user use le bouton retour du navigateur*/

	function updateData()
	{
		const code = params.get("code")
		const {hostname, port} = document.location;
    	if (code)
		{
      		setFortyTwo(true);
			const request = fetch(`http://${hostname}:4000/auth/token/${code}`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json','cors': 'true'},
				body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
			})
			request.then(response => response.json()
      			.then((response) => {dispatch({type: "User/setUser", payload: response,});}))
					request.catch(e => {console.error(e)})
	}
		return () => {}
	}

	const connect = async () => {
		room = User.room;
		if (room)
		{
			room.onMessage("client", (message) => {
				clientsNb = message.clientsNb;
				if (clientsNb === 1)
				{
					player.userName = user.username;
					player.id = message.client.sessionId;
					room.send("player1_name", {player1_username : player.userName});
				}
				else if (clientsNb === 2)
				{
					player2.userName = user.username;
					player2.id = message.client.sessionId;
					room.send("player2_name", {player2_username : player2.userName});
				}
				clientId = message.client.sessionId;
				room.onMessage("players_names", (message) => {
					player.userName = message.player_name;
					player2.userName = message.player2_name;
					console.log(player.userName);
					console.log(player2.userName);
				})
			});
		}
	}

	const draw = () => {
			
		context = canvas.current.getContext("2d");
		// canvas.current.width = canvas.current.width;
		// canvas.current.height = canvas.current.height;
		// context.fillStyle = "transparent";
		// context.fillRect(0, 0, canvas.current.width, canvas.current.height);
		context.clearRect(0, 0, canvas.current.width, canvas.current.height);

		context.fillStyle = "black";
		context.font = "30px Arial";
		context.fillText(player.userName, canvas.current.width / 4 - 35, canvas.current.height / 3);
		context.fillText(player.score, canvas.current.width / 4, canvas.current.height / 2);

		context.fillStyle = "black";
		context.font = "30px Arial";
		context.fillText(player2.userName, 3 * canvas.current.width / 4 - 35, canvas.current.height / 3);
		context.fillText(player2.score, 3 * canvas.current.width / 4, canvas.current.height / 2);

				// draw paddle_player

		context.fillStyle = 'white';
		context.fillRect(player.x, player.y, setting_game.paddle_width, setting_game.paddle_height);
		context.fillRect(player2.x, player2.y, setting_game.paddle_width, setting_game.paddle_height);

				//draw ball

		context.beginPath(); // permet d'effacer tout les tracages possible pour n'avoir qu'une balle
		context.fillStyle = 'white';
		context.arc(ball.x , ball.y, setting_game.ball_radius, 0, Math.PI * 2, false);
		context.fill(); // permet de dessiner l'interieure	
		
				//draw line
			
		context.strokeStyle = 'white';
		context.beginPath();
		context.moveTo(canvas.current.width / 2, 0);
		context.lineTo(canvas.current.width / 2, canvas.current.height);
		context.stroke();
	}
		// L’évènement DOMContentLoaded est émis lorsque le document HTML initial a été complètement chargé et analysé
	// document.addEventListener('DOMContentLoaded', function () // latence a gerer
	// {
		
	// });

	document.addEventListener('keypress', (event) => 
	{
		const nomTouche = event.key;
		console.log(nomTouche);
	});
	
		// permet de bouger les payers avec la souris 
	function playerMove(event: any) {
		if (clientId === player.id)
		{
			var canvasLocation = canvas.current.getBoundingClientRect();
			var mouseLocation = event.clientY - canvasLocation.y;
			player.y = mouseLocation - setting_game.paddle_height / 2;

			// permet de limiter les players par rapport a la taille du canvas
			if (mouseLocation < setting_game.paddle_height / 2) {
				player.y = 0;
			} else if (mouseLocation > canvas.current.height - setting_game.paddle_height / 2) {
				player.y = canvas.current.height - setting_game.paddle_height;
			} else {
				player.y = mouseLocation - setting_game.paddle_height / 2;
			}
			if (room)
			{
				room.send("player", {player_y : player.y})
			}
		}
		else if (clientId === player2.id)
		{
			var canvasLocation = canvas.current.getBoundingClientRect();
			var mouseLocation = event.clientY - canvasLocation.y;
			player2.y = mouseLocation - setting_game.paddle_height / 2;

			// permet de limiter les players par rapport a la taille du canvas
			if (mouseLocation < setting_game.paddle_height / 2) {
				player2.y = 0;
			} else if (mouseLocation > canvas.current.height - setting_game.paddle_height / 2) {
				player2.y = canvas.current.height - setting_game.paddle_height;
			} else {
				player2.y = mouseLocation - setting_game.paddle_height / 2;
			}
			if (room)
			{
				room.send("player2", {player2_y : player2.y})
			}
		}
		if (room)
		{
			room.onMessage("player", (message) => {
				player.y = message.player_y;
			})

			room.onMessage("player2", (message) => {
				player2.y = message.player2_y;
			})
		}
	}


		// mouvrement du coomputer
		// function computerMove() 
		// {
		// 	computer.y += ball.velocity_y * 0.85;
		// }

	async function collide(playerCurrent: Player) {
		//preventDefault();
		// The player does not hit the ball
		if (ball.y < playerCurrent.y || ball.y > playerCurrent.y + setting_game.paddle_height)
		{
			// Set ball and players to the center
			ball.x = canvas.current.width / 2;
			ball.y = canvas.current.height / 2;
			// player.y = canvas.height / 2 - setting_game.paddle_height / 2;
			// player2.y = canvas.height / 2 - setting_game.paddle_height / 2;
			if(playerCurrent === player)
			{
				player2.score++;
				room.send("updateScore", {player_score: player.score , player2_score : player2.score});
			}
			else 
			{
				player.score++;
				room.send("updateScore", {player_score: player.score , player2_score : player2.score});
			}
			// Reset speed
			if (player2.score === setting_game.score_limits || player.score  === setting_game.score_limits)
			{
				room.send("gameEnd", {player_score: player.score , player2_score : player2.score});
				updateData();
				navigation('/Home');
			}
			ball.velocity_x = (Math.random() * 5 + 5) * (Math.random() < .5 ? -1 : 1);
			ball.velocity_y = Math.random();
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
		if (clientId === player.id)
		{
			if (ball?.y > canvas.current.height || ball?.y < 0) {
				ball.velocity_y *= -1;
			}
			if (ball?.x + setting_game.ball_radius > canvas.current.width - setting_game.paddle_width) {
				collide(player2);
			} else if (ball?.x - setting_game.ball_radius < setting_game.paddle_width) {
				collide(player);
			}
			ball.x += ball.velocity_x;
			ball.y += ball.velocity_y;
			room.send("ballPos", {ball_x : ball.x, ball_y : ball.y});
		}
		room.onMessage("ballPos", (message) => {
			ball.x = message.ball_x;
			ball.y = message.ball_y;	
		})
		room.onMessage("updateScore", (message) => {
			player.score = message.player_score;
			player2.score = message.player2_score;
			if (player2.score === setting_game.score_limits || player.score  === setting_game.score_limits)
			{
				room.send("gameEnd", {player_score: player.score , player2_score : player2.score});
				updateData();
				navigation('/Home');
			}
		})
		room.onMessage("leaver", (message) => {
			if (message.leaver === player.userName)
				player.score = -1;
			if (message.leaver === player2.userName)
				player2.score = -1;
			room.send("gameEnd", {player_score: player.score , player2_score : player2.score});
			updateData();
			navigation('/Home');
		})
		room.send("pong", {id : clientId});
	}

	const display = () => {
		ballMove();
		//computerMove();
		draw();
		animationRequest = requestAnimationFrame(display);
	}

	useEffect( () => {
		player = new Player(0, setting_game.player_y, 0, 0);
		player2 = new Player(canvas.current.width - setting_game.paddle_width, setting_game.player_y, 0, 0);
		ball = new Ball(canvas.current.width / 2, canvas.current.height / 2, 2, 2);
		connect()
			.then(() => display());
		console.log(result);

		return () => {
			cancelAnimationFrame(animationRequest);
		}
	}, [canvas.current]);

	return(
		<>
		<Navbar / >
		<div className="visual">
			<div>
				
				{/* <div className="scorePlayer1">joueur 1: {p1_score}</div>
				<div className="scorePlayer2">joueur 2: {p2_score}</div> */}
				<canvas onMouseMove={playerMove} className="gameCanvas" ref={canvas} width='680' height='450'/>
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