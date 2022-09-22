import { useState, useEffect } from 'react';
import '../../styles/Components/Share/UserProfil.css'
import { useParams } from 'react-router';
import Navbar from './Navbar';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function UserProfil() {
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const[addroom, setAddroom] = useState(false);
    const user_id = useParams();
    const [user, setUser]  = useState(User);

    useEffect( () => {
        const url = `http://localhost:4000/users/${user_id.id}`
        fetch(url)
        .then(response => response.json())
        .then (data => setUser(data));
    },
    []
    )
    return (
        <div className='userprofil'>
        <Navbar></Navbar>
        <div className="profilset-content">
            <form className="form-setting" data-aos="fade-up" data-aos-duration="1000" >
                <img  className="vignette-form" src={user.avatar_url}></img>
                <h3>{user.nickname}</h3>
                <button className="btn btn-primary btn-add">Ajouter</button>
                <button className="btn btn-secondary">Supprimer</button>
                <button className="btn btn-light">Message</button>
            </form>
        </div>
        </div>
    );
}