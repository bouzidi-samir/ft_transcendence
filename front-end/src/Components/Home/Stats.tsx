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
    const [gameList, setGames] = useState(["hello"]);
    let games : any;


    const fetchGame = async () => {

        const url = `http://${hostname}:4000/games/history`
        const ret = await fetch(url, {headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        }})
        games = await ret.json();
        setGames(games.games);
    }

        useEffect(()=>{
            fetchGame();
        }, [])

    return (
        <div className='stats-content'>
            <div className='match-total'>
            <p>Historique</p>
            <hr style={{backgroundColor: "white"}}></hr>
                    <div className='tableau'>
                        <div className='col'>
                            <div className='case1'> <p>Joueur-1</p></div>
                            <div className='case1'> <p>Joueur-2</p></div>
                            <div className='case1'><p>Score-1</p></div>
                            <div className='case1'><p>Score2</p></div>
                        </div>
                        {gameList.map( (game : any) => 
                              <div key={game.id} className='col'>
                              <div className='case'> <p>{game.p1_userName}</p></div>
                              <div className='case'> <p>{game.p2_userName}</p></div>
                              <div className='case'><p>{game.p1_score}</p></div>
                              <div className='case'><p>{game.p2_score}</p></div>
                          </div>
                        )}
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