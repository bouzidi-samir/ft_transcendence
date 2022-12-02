import '../../styles/Components/Share/Navbar.css';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useSelector } from "react-redux";

function Navbar() {
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();

    function logout () : void {
        dispatch({type: "User/logout",payload: null});
        dispatch({type: "RoomList/logout",payload: null});
        dispatch({type: "RoomActive/logout",payload: null});
        // document.cookie = '_intra_42_session_production; Max-Age=0; path=/; domain=.intra.42.fr';

        var allCookies = document.cookie.split(';');
        for (var i = 0; i < allCookies.length; i++)
            document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
            
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
                            <img src={User.avatar_url}
                            className='avatar'></img>
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
                        <Link className="nav_link" to="/">
                            <div className='game-icon'></div>
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