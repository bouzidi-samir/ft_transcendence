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
    const [gameList, setGames] = useState([{
        p1_score : 0,
        p1_userName : "",
        p2_score : 0,
        p2_userName : "",
    }]);
    let games : any;
  
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


    const fetchGame = async () => {

        // console.log(gamesList);
        //console.log(games['games']);

        // games['games'].splice();
        // console.log(games['games'][0]);

        const url = `http://${hostname}:4000/games/history`
        const ret = await fetch(url, {headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        }})
        games = await ret.json();
        console.log("la game ==> ",games)
        setGames(games["games"]);
       // setsw(1);
    }

    const  createList =  () =>
    { 
        let content = [];


       for (let i = 0 ; i < gameList.length; i++){
        if((user.username == gameList[i].p1_userName) || (user.username == gameList[i].p2_userName))
            content.push(<a href="#" > {gameList[i].p1_userName} : {gameList[i].p1_score}  |  {gameList[i].p2_score} : {gameList[i].p2_userName}</a>);
       }
        return content;
    }

    useEffect(()=>{
        fetchData();
        fetchGame();
    }, [])
         
    return (
        <div className='userprofil'>
        <Navbar></Navbar>
        <div className="profilset-content">
            <form className="form-setting" data-aos="fade-up" data-aos-duration="1000" >
                <Cross lastPage="/Chat"/>
                <img  className="vignette-user" src={user.avatar_url}></img>
                <h3>{user.nickname}</h3>
                {/* <p>{user.status}</p> */}
                <p>{user.online ? "online" : "offline"}</p>
                <p>{user.status}</p>
                <hr></hr>
                <div className='vertical-menu'>
                    <a href="#" className="active">Historique des parties.</a>

                    <>{createList()}</>
                </div>
                <p style={{color: 'white'}} className='user-stat'>Victoires: {user.game_won}</p>
                <p style={{color: 'white'}} className='user-stat'>Défaites: {user.game_lost}</p>
                <AddFriend toUsername={user_id.id}/>
                <Block toUsername={user_id.id}/>
            </form>
        </div>
        </div>
    );
}