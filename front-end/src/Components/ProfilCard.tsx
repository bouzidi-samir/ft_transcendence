import { from } from '@apollo/client';
import '../styles/Components/ProfilCard.css'

export default function ProfilCard() {
    return (
        <div className='profilCard-content'>
            <div className='vignette-card'></div>
            <h2>Nom</h2>
            <p>Niveau:</p>
        </div>

    );
}