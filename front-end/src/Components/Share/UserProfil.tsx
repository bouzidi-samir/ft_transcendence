import { useState, useEffect } from 'react';
import '../../styles/Components/Share/UserProfil.css'
import { useParams } from 'react-router';
import Navbar from './Navbar';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import Cross from './Cross';
import Block from './Block';
import AddFriend from './AddFriend';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserProfil() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const[addroom, setAddroom] = useState(false);
    const user_id = useParams();
    const [user, setUser]  = useState(User);
    const location = useLocation();
    let navigation = useNavigate();
  
    async function fetchData(){
        const url = `http://${hostname}:4000/users/search/${user_id.id}`
        await fetch(url, {headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        }})
        .then(response => response.json())
        .then ((data) => {setUser(data);}
        );
    }

    useEffect(()=>{fetchData();}, [])
         
    return (
        <div className='userprofil'>
        <Navbar></Navbar>
        <div className="profilset-content">
            <form className="form-setting" data-aos="fade-up" data-aos-duration="1000" >
                <Cross lastPage="/Chat"/>
                <img  className="vignette-user" src={user.avatar_url}></img>
                <h3>{user.nickname}</h3>
                <p>{user.status}</p>
                <hr></hr>
                <p style={{color: 'white'}} className='user-stat'>Matchs Joués:  {user.game_played}</p>
                <p style={{color: 'white'}} className='user-stat'>Victoires: {user.game_won}</p>
                <p style={{color: 'white'}} className='user-stat'>Défaites: {user.game_lost}</p>
                <AddFriend toUsername={user_id.id}/>
                <Block toUsername={user_id.id}/>
            </form>
        </div>
        </div>
    );
}