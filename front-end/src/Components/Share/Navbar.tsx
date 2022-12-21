import '../../styles/Components/Share/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useState} from 'react';



function Navbar() {
    const {hostname} = document.location;
    const [chatalt, setChatalt]  = useState(false);
    const [logoutalt, setLogouttalt]  = useState(false);
    const [gamealt, setGamealt]  = useState(false);
    const [homealt, setHomealt]  = useState(false);
    const [profilalt, setProfilalt]  = useState(false);
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const user_id = useParams();
    const [user, setUser]  = useState(User);
    const [twofactor, setTwoFactor]  = useState(false);
    const navigate = useNavigate();
    
    async function logout1 () {
        localStorage.clear();
        document.cookie = "_intra_42_session_production=e0e6ed570f292eeed6b80e510af6b961; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

        let url = `http://${hostname}:4000/chat/setOffline`;
        fetch(url, {method: "POST",
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
        // socket?.emit("offline", "off");
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
            <div className=" navbar-collapse" id="toggleMobileMenu">
            
                <ul className="navbar-nav ms-auto text-center">                
                    <Link className="nav_link" to="/ProfilSettings">
                            <img src={User.avatar_url}className='avatar'>
                            </img>
                    </Link>
                    <li>   
                    <Link className="nav_link" to="/Home">
                        <div onMouseEnter={() => setHomealt(true)} onMouseLeave={() => setHomealt(false)}  className='home-icon'>
                            {homealt ?<div className='my-alt'><p>Accueil</p></div> : null}
                        </div>
                    </Link>
                    </li> 
                    <li>
                    <Link  className="nav_link" to="/ProfilSettings">
                        <div onMouseEnter={() => setProfilalt(true)} onMouseLeave={() => setProfilalt(false)}  className='profil-icon'>
                            {profilalt ?<div className='my-alt'><p>Profil</p></div> : null}
                        </div>
                    </Link>
                    </li> 
                    <li>   
                    <Link className="nav_link" to="/Chat">
                        <div onMouseEnter={() => setChatalt(true)} onMouseLeave={() => setChatalt(false)} className='chat-icon'>
                            {chatalt ?<div className='my-alt'><p>Chat</p></div> : null}
                        </div>
                    </Link>
                    </li>  
                    <li>   
                    <Link className="nav_link" to="/Matching">
                        <div onMouseEnter={() => setGamealt(true)} onMouseLeave={() => setGamealt(false)}  className='game-icon'>
                            {gamealt ?<div className='my-alt'><p>Jeux</p></div> : null}
                        </div>
                    </Link>
                    </li>
                    <li>   
                    <Link onClick={logout1}  className="nav_link" to="/">
                         <div onMouseEnter={() => setLogouttalt(true)} onMouseLeave={() => setLogouttalt(false)}  className='logout-icon'>
                            {logoutalt ?<div className='my-alt'><p>Logout</p></div> : null}
                        </div> 
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