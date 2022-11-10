import '../../styles/Components/Home/Users.css'
import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import PrivateMessage from '../Chat/PrivateMessage';

export default function Users() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const [friends, setFriends] = useState([]);
    const dispatch = useDispatch();

    useEffect( () => {    
        let url : string = `http://${hostname}:4000/users`;
        fetch(url,{headers: {'Authorization': `Bearer ${User.JWT_token}`}})
        .then(response => response.json())
        .then(data =>  dispatch({type: "Userlist/setUserlist",payload: data,}));
    }, []
    )

    useEffect( () => {    
        let url : string = `http://${hostname}:4000/users/friend/${User.username}`;
        fetch(url,{headers: {'Authorization': `Bearer ${User.JWT_token}`}})
        .then(response => response.json())
        .then(data =>  setFriends(data));
    }, []
    )
    
    return (
        <div className='users-content'>
                <p>Mes Amis</p>
                <hr></hr>
            <div className='friends'>   
                {
                    Userlist.map((u : any)=> (
                        u.username !== User.username ? 
                        <div className='friend'>
                            <img key={u.id} className='user-avatar' src={u.avatar_url}></img>
                            <p>{u.nickname}</p>
                        </div>
                        : null
                    )
                    )
                }
            </div>  
        </div>

    );
}