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
    let navigation = useNavigate();
    const [user, setUser]  = useState(User);
    const location = useLocation();
    const [gameList, setGames] = useState([{
        p1_score : 0,
        p1_id : 0,
        p2_score : 0,
        p2_id : 0,
        p1_nick : 'null',
        p2_nick : 'null',
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
        setGames(games["games"]);
       // setsw(1);
    }

    const  createList =  () =>
    { 
        let content = [];

       for (let i = 0 ; i < gameList.length; i++){
        if((user.id == gameList[i].p1_id) || (user.id == gameList[i].p2_id))
            content.push(<p key= {i}> {gameList[i].p1_nick} : {gameList[i].p1_score}  |  {gameList[i].p2_score} : {gameList[i].p2_nick}</p>);
       }
        return content;
    }

    const checkGuard = async () =>
	{
		let url_ = `http://${hostname}:4000/games/checkGuard`;
        await fetch(url_, {method: "POST",
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
        username: User.username,
        })
        })
		.then((response) => {
			if (response.status === 401)
				throw new Error()
			else
			{
                fetchData();
                fetchGame();
			}
		})
	}

    useEffect(()=>{
        checkGuard().catch(() =>
		{
			navigation('/Unauthorized')
		})
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
				<p>{user.online ? "online" : "offline"} {user.onGame ? " - in a Game" : null}</p>
				<p></p>
                <hr></hr>
                <h4>Historique:</h4>
                <div className='scor-profil'>
                    {createList()}
                </div>
                <AddFriend toUsername={user_id.id}/>
                <Block toUsername={user_id.id}/>
            </form>
        </div>
        </div>
    );
}