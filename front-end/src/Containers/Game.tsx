import { connect } from "react-redux";
import "../styles/Containers/Game.css";
import { Client } from "colyseus.js";
import { useEffect, useRef } from "react";
import { parseConfigFileTextToJson } from "typescript";

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
		let canvasSize = {width: 1920, height: 1080};
        if (canvas){
            const context = canvas.getContext("2d");
            if (context){
                context.fillStyle = "#black";
				context.fillRect(0, 0, canvas.width, canvas.height);
			}
        }
}
	const render = () => {
        resetCanvas(); 
        requestAnimationFrame(render);
    }

	useEffect(() => {
		render();
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
 