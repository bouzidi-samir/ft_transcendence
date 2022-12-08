import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import '../../styles/Components/Home/Stats.css'


export default function Stats() {
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const user_id = useParams();
    const [user, setUser]  = useState(User);
    const {hostname} = document.location;
    const [gameList, setGames] = useState([{
        p1_score : 0,
        p1_userName : "",
        p2_score : 0,
        p2_userName : "",
    }]);
    let games : any;


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
        if((User.username == gameList[i].p1_userName) || (User.username == gameList[i].p2_userName))
            content.push(<a href="#" > {gameList[i].p1_userName} : {gameList[i].p1_score}  |  {gameList[i].p2_score} : {gameList[i].p2_userName}</a>);
       }
        return content;
    }

    //const [gameList, setList]  = useState(createList());

    useEffect(()=>{
        fetchGame();
        //setsw(1);
    }, [])

    return (
        <div className='stats-content'>
            <div className='match-total'>
            <p>Historique</p>
            <hr style={{backgroundColor: "white"}}></hr>
                <div className='vertical-menu'>
                    <a href="#" className="active">Historique des parties.</a>

                    <>{createList()}</>
                </div>
            </div>
            <div className='match-stats'>
                <div className='win-lost'> 
                    <div className='circle'>
                        <p>{User.gameWon}</p>
                    </div>
                        <p>Victoires</p>
                </div>
                <div className='win-lost'>
                    <div className='circle'>
                        <p>{User.gameLost}</p>
                    </div>
                        <p>Défaites</p>
                </div>
            </div>
        </div>
        

    );
}