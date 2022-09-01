import { useContext } from 'react';
import { from } from '@apollo/client';
import '../styles/Components/ProfilCard.css'
import UserContext from '../Context/userProfilContext';

export default function ProfilCard() {
    const user = useContext(UserContext);
    return (
        <div className='profilCard-content'>
            <div className='vignette-card'></div>
            <h2>Nom</h2>
            <p>Niveau:</p>
        </div>

    );
}