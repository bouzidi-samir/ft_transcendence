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
import { createImportSpecifier, updatePostfix } from "typescript";
import { useSearchParams } from "react-router-dom";
import { RoomInternalState } from "colyseus";


let clientsNb;

export default function Game() {
	const {hostname} = document.location;
	const User = useSelector((state: any) => state.User);
	const Game = useSelector((state: any) => state.Game);
    const dispatch = useDispatch();
    const user_id = useParams();
    const [user, setUser]  = useState(User);
	const score = [0, 0];
	const [connected, setConnect] = useState(0);
	const result = useMemo(() => Math.random(), []);
	let navigation = useNavigate();
	const [fortyTwo, setFortyTwo] = useState(false);
	const [params] = useSearchParams();


	let client: Client = new Colyseus.Client(`ws://${hostname}:4000`);
	let clientId : number;
	let canvas : any = useRef(null);
	let ball : Ball;
	let player : Player;
	let player2 : Player;
	//let computer : Computer;
	let context : any;
	let room : Colyseus.Room<unknown>;
	let animationRequest: number;
	let finished : number = 0;


	/*var unload = require('unload');
	unload.add(function(){
    	console.log('Ouch, I\'m dying.');
	}); // detecte si un user quitte la page.
	if (window.performance && window.performance.navigation.type == window.performance.navigation.TYPE_BACK_FORWARD) {
		alert('Ouch, Im dying.');
	} // detecte si un user use le bouton retour du navigateur*/

	function updateData()
	{
		let userUpdate = {...User};
		if (player.userName === User.username)
		{
			if (player.score > player2.score)
			{
				userUpdate.gameWon += 1;
				userUpdate.gamePlayed += 1;
				userUpdate.ello += 10;
			}
			else
			{
				userUpdate.gameLost += 1;
				userUpdate.gamePlayed += 1;
				userUpdate.ello -= 10;
			}
		}
		else if (player2.userName === User.username)
		{
			if (player2.score > player.score)
			{
				userUpdate.gameWon += 1;
				userUpdate.gamePlayed += 1;
				userUpdate.ello += 10;
			}
			else
			{
				userUpdate.gameLost += 1;
				userUpdate.gamePlayed += 1;
				userUpdate.ello -= 10;
			}
		}
		userUpdate.status = "online";
		dispatch({type: "User/setUser", payload: userUpdate,});
	}

	const clientInit = async() => {
		room = user.room;
		room.onMessage("players_names&scores", (message) => {
				player.userName = message.player_name;
				player2.userName = message.player2_name;
				player.score = message.p1_score;
				player2.score = message.p2_score;
				player.nickname = message.p1_nick;
				player2.nickname = message.p2_nick;
				player.color = message.p1_color;
				player2.color = message.p2_color;
		})

		room.onMessage("role", async (message) => {
				if(message.role === "player1")
				{
					player.userName = user.username;
					player.id = message.client.sessionId;
					clientId = player.id
				}
				else if (message.role === "player2")
				{
					player2.userName = user.username;
					player2.id = message.client.sessionId;
					player.id = 0;
					clientId = player2.id;
				}
				else if (message.role === "viewer")
				{
					player.id = 0;
					player2.id = 0;
					clientId = message.client.sessionId;
				}
		})
		room.send("player_name", {player_username : user.username, player_nick : user.nickname, color : Game.padColor});
	}

	const draw = () => {
		if (canvas.current && canvas.current.getContext("2d") != null)
		{
			context = canvas.current.getContext("2d");

			// context.fillStyle = "transparent";
			// context.fillRect(0, 0, canvas.current.width, canvas.current.height);
			context.clearRect(0, 0, canvas.current.width, canvas.current.height);

			context.fillStyle = "black";
			context.font = "30px Arial";
			context.fillText(player.nickname, canvas.current.width / 4 - 35, canvas.current.height / 3);
			context.fillText(player.score, canvas.current.width / 4, canvas.current.height / 2);

			context.fillStyle = "black";
			context.font = "30px Arial";
			context.fillText(player2.nickname, 3 * canvas.current.width / 4 - 35, canvas.current.height / 3);
			context.fillText(player2.score, 3 * canvas.current.width / 4, canvas.current.height / 2);

					// draw paddle_player

			context.fillStyle =  player.color;
			context.fillRect(player.x, player.y, setting_game.paddle_width, setting_game.paddle_height);
			context.fillStyle =  player2.color;
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
	}
		// L’évènement DOMContentLoaded est émis lorsque le document HTML initial a été complètement chargé et analysé
	// document.addEventListener('DOMContentLoaded', function () // latence a gerer
	// {
		
	// });

	document.addEventListener('keypress', (event) => 
	{
		const nomTouche = event.key;
	});
	
		// permet de bouger les payers avec la souris 

		function playerMove(event: any) {
			if (clientId === player.id)
			{
				var canvasLocation = canvas.current.getBoundingClientRect();
				var mouseLocation = event.clientY - canvasLocation.y;
				player.y = (mouseLocation / canvasLocation.height * canvas.current.height)
								- setting_game.paddle_height / 2;
	
				// permet de limiter les players par rapport a la taille du canvas
				if (mouseLocation < setting_game.paddle_height / 2) {
					player.y = 0;
				} else if ((mouseLocation / canvasLocation.height * canvas.current.height)
							+ setting_game.paddle_height / 2 > canvas.current.height) {
					player.y = canvas.current.height - setting_game.paddle_height;
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
				player2.y = (mouseLocation / canvasLocation.height * canvas.current.height)
								- setting_game.paddle_height / 2;
	
				// permet de limiter les players par rapport a la taille du canvas
				if (mouseLocation < setting_game.paddle_height / 2) {
					player2.y = 0;
				} else if ((mouseLocation / canvasLocation.height * canvas.current.height)
							+ setting_game.paddle_height / 2 > canvas.current.height) {
					player2.y = canvas.current.height - setting_game.paddle_height;
				}
				if (room)
				{
					room.send("player2", {player2_y : player2.y})
				}
			}
		}

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
				finished = 1;
				navigation('/Home');
			}
		})
		room.onMessage("leaver", (message) => {
			updateData();
			finished = 1;
			navigation('/Home');
		})
	}


	function updatePos()
	{
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

	const display = () => {
		ballMove();
		//computerMove();
		updatePos();
		draw();
		animationRequest = requestAnimationFrame(display);
	}

	useEffect( () => {
		player = new Player(0, setting_game.player_y, 0, 0);
		player2 = new Player(canvas.current.width - setting_game.paddle_width, setting_game.player_y, 0, 0);


		ball = new Ball(canvas.current.width / 2, canvas.current.height / 2, 2, 2);
		clientInit().then(() => display());
		return () =>{
			cancelAnimationFrame(animationRequest);
		}
	}, [canvas.current]);

	useEffect( () => {
		return () => {
			if (finished === 0)
				room.send("leaver", {id: room.sessionId , player1_score : player.score ,player2_score : player2.score});
			room.leave();
		}
	}, [])


	useEffect( () => {
		let url_ = `http://${hostname}:4000/chat/setInGame`;
        fetch(url_, {method: "POST",
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username: User.username,
            })
        }
        )
	}, [])
	useEffect( () => {
		return () => {
		let url_ = `http://${hostname}:4000/chat/setOffGame`;
        fetch(url_, {method: "POST",
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username: User.username,
            })
        }
        )}
		}, [])


	return(
		<>
		<Navbar / >
		<div className="visual" onMouseMove={playerMove}>
			<div>
				{/* <div className="scorePlayer1">joueur 1: {p1_score}</div>
				<div className="scorePlayer2">joueur 2: {p2_score}</div> */}
				<canvas className="gameCanvas" ref={canvas} width='680' height='450'/>
			</div>
		</div>
		</>
	)
}