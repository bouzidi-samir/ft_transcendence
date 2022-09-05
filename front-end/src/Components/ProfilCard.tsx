import { useContext } from 'react';
import { from } from '@apollo/client';
import '../styles/Components/ProfilCard.css'
import UserContext from '../Context/userContext';

export default function ProfilCard() {
    const {user, setUser} = useContext(UserContext); 
    return (
        <div className='profilCard-content'>
            <img src={user.avatar_url} className='vignette-card'></img>
            <h2>{user.nickname}</h2>
            <p>Niveau:</p>
        </div>

    );
}