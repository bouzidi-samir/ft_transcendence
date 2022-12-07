import '../../styles/Components/Share/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}

function Navbar() {
    const {hostname} = document.location;
    
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const user_id = useParams();
    const [user, setUser]  = useState(User);
    const [twofactor, setTwoFactor]  = useState(false);
    const navigate = useNavigate();
    
    async function logout1 () {
        //setCookie('name', "_intra_42_session_production", 30);
        //document.cookie = '_intra_42_session_production=e0e6ed570f292eeed6b80e510af6b961'; //Crée ou met à jour un cookie 'user'
        console.log(document.cookie);
        localStorage.clear();
        document.cookie = "_intra_42_session_production=e0e6ed570f292eeed6b80e510af6b961; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
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
                        <Link className="nav_link" to="/Matching">
                            <div className='game-icon'></div>
                        </Link>
                        </li>
                        <li>   
                        <Link onClick={logout1} className="nav_link" to="/">
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