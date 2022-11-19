import { useState, useEffect } from 'react';
import '../../styles/Components/Share/UserProfil.css'
import { useParams } from 'react-router';
import Navbar from './Navbar';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import Cross from './Cross';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserProfil() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const[addroom, setAddroom] = useState(false);
    const user_id = useParams();
    const [user, setUser]  = useState(User);
    const location = useLocation();
    let navigation = useNavigate();
   
    console.log(user_id);
    useEffect( () => {
        const url = `http://${hostname}:4000/users/search/${user_id.id}`
        fetch(url, {headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        }})
        .then(response => response.json())
        .then (data => setUser(data));
    },
    []
    )
    
    async function handleBlock(e: any) {

            e.preventDefault();
            let url = `http://${hostname}:4000/users/blockUser`;
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username: User.username,
            targetUsername: location.state.toBlock.user.username,
            })
        }
        ).then(response => response.json())
            console.log('toblock', response);
        
        }

        async function handleNewFriend(e: any) {

            e.preventDefault();
            let url = `http://${hostname}:4000/users/forceToBeMyFriend`;
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            myUsername: User.username,
            otherUsername: location.state.toBlock.user.username,
            })
        }
        ).then(response => response.json())
            console.log('myFriend', response);
        
        }
console.log(user.nickname);
    return (
        <div className='userprofil'>
        <Navbar></Navbar>
        <div className="profilset-content">
            <form className="form-setting" data-aos="fade-up" data-aos-duration="1000" >
                <Cross lastPage="/Chat"/>
                <img  className="vignette-user" src={user.avatar_url}></img>
                <h3>{user.nickname}</h3>
                <hr></hr>
                <div className='ecusson-user'></div>
                <p>Novice</p>
                <button onClick={handleNewFriend} className="btn btn-primary btn-add">Ajouter</button>
                <button onClick={handleBlock} className="btn btn-secondary">Bloquer</button>
            </form>
        </div>
        </div>
    );
}