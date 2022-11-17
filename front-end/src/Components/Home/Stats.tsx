import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import '../../styles/Components/Home/Stats.css'


export default function Stats() {
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const user_id = useParams();
    const [user, setUser]  = useState(User);
    return (
        <div className='stats-content'>
            <div className='match-total'>
                <div className='circle'>
                    <p>{User.gamePlayed}</p>
                </div>
                <p>Matchs joués</p>
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