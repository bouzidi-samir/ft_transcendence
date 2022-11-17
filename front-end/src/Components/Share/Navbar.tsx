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
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const user_id = useParams();
    const [user, setUser]  = useState(User);
    const [twofactor, setTwoFactor]  = useState(false);
    const navigate = useNavigate();

    function logout1 () : void {
        localStorage.clear();
    }

    async function logout ()  {
        dispatch({type: "User/logout",payload: null});
        dispatch({type: "RoomList/logout",payload: null});
        await fetch(`http://localhost:4000/auth/logout`, { // A remplacer avec le user
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${User.JWT_token}`
            },
            body: JSON.stringify({userId : user.id })
        })
        localStorage.clear();
    }

    async function TfaSwitch(e : any) // changer l affichage selon si c est active ou non et pas un clic
    {
        console.log("here");
        let userUpdate = {...User};
        if (User.TFOenabled === true)
            userUpdate.TFOenabled = false;
        else
            userUpdate.TFOenabled = true;
        dispatch({
            type : "User/setUser",
            payload: userUpdate
        })
        console.log(user.JWT_token);
        const request = await fetch(`http://localhost:4000/2fa/switch`, { // A remplacer avec le user
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${User.JWT_token}`
            },
            body: JSON.stringify({userId : user.id })
        })
        console.log("herepast");
        if (userUpdate.TFOenabled === true)
        {
            console.log('/qrcode')
            return (navigate("/qrcode"));
        }
        else
        {
            console.log('/home')
            return (navigate("/home"));
        }
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
                            <label className="switch">
                            <input type="checkbox" onClick={TfaSwitch} defaultChecked={User.TFOenabled == true}/>
                            <span className="slider round"></span>
                            </label>
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