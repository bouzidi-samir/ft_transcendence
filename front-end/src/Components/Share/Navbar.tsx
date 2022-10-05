import '../../styles/Components/Share/Navbar.css';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import * as Colyseus from "colyseus.js";


const client = new Colyseus.Client('ws://localhost:4000');

async function JoinOrCreateRoom()
{
    try {
    const room = await client.joinOrCreate("my_room", {mode: "duo", })
    console.log(room.sessionId, "joined", room.name);
    
        room.onMessage("clientsNb", (message) => {
        console.log("here");
        if (message.clientsNb === 1)
            room.send("p1Data", {p1_score: 0, p1_userName : "qbrillai"}); // a changer si on arrive a faire marcher le usercontext
        if (message.clientsNb === 2)
            room.send("p2Data", {p2_score: 0, p2_userName : "test"});  
        });
        room.send("p1", {test : "test"});
    
    // room.send("move", {direction: "left"}); exemple pour envoyer des messages a la room
    /*room.onMessage("powerup", (message) => {
        console.log("message received from server");
        console.log(message);
      }); Exemple reception de messages */
    }
    catch (e){ console.log("Cant join or create")}
}

function Navbar() {
    const User = useSelector((state: any) => state.User);

    function logout () : void {
        console.log('logout');
    }

    return (
        <div className="Navbar">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light ">    
                    <a href="#" className="navbar-brand">
                    </a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse"
                    data-bs-target="#toggleMobileMenu"
                    aria-controls="toggleMobileMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="toggleMobileMenu">
                
                    <ul className="navbar-nav ms-auto text-center"> 
                        <Link className="nav_link" to="/Home">
                            <div 
                            className='avatar'></div>
                        </Link>
                        <li>   
                        <Link className="nav_link" to="/Home">
                            <div 
                            className='home-icon'></div>
                        </Link>
                        </li> 
                        <li>   
                        <Link  className="nav_link" to="/ProfilSettings">
                            <div 
                            className='profil-icon'></div>
                        </Link>
                        </li> 
                        <li>   
                        <Link className="nav_link" to="/Chat">
                            <div className='chat-icon'></div>
                        </Link>
                        </li>  
                        <li>   
                        <Link  onClick={JoinOrCreateRoom}
                            className="nav_link" to="/">
                            <div className = 'game-icon'></div>
                        </Link>
                        </li>
                        <li>   
                        <Link onClick={logout} className="nav_link" to="/">
                            <div className='logout-icon'></div>
                        </Link>
                        </li>
                    </ul>
                   
                
                </div>
                 
                </nav>
            </div>
        </div>
    );
}

export default Navbar;