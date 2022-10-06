import "../styles/Containers/Game.css";

export default function Game() {

	return(
		<>
		<div className="score">
			<div id="player-score">0</div>
			<div id="computer-score">0</div>
		</div>

		<div className="ball" id="ball"></div>
		<div className="paddle left" id="player-paddle"></div>
		<div className="paddle right" id="player-paddle"></div>
		</>
	)
}
 