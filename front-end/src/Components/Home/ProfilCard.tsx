import '../../styles/Components/Home/ProfilCard.css'
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function ProfilCard() {
    const User = useSelector((state: any) => state.User);
    return (
        <div className='profilCard-content'>
            <img src={User.avatar_url} className='vignette-card'></img>
            <h2>{User.nickname}</h2>
            <hr></hr>
            <div className='ecusson'></div>
            <p>Novice</p>
        </div>
    );
}