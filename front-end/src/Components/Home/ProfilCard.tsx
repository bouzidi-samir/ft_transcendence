import { useContext } from 'react';
import { from } from '@apollo/client';
import '../../styles/Components/ProfilCard.css'
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function ProfilCard() {
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
 
    return (
        <div className='profilCard-content'>
            <img src={User.avatar_url} className='vignette-card'></img>
            <h2>{User.nickname}</h2>
            <p>Niveau:</p>
        </div>

    );
}