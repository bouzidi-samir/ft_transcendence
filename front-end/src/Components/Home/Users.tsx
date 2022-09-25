import '../../styles/Components/Home/Users.css'
import { useState, useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function Users() {

    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const [userlist, setUserlist] : any = useState([{}]);

    useEffect(() => {
        let url = "http://localhost:4000/users";
        fetch(url)
        .then (response => response.json())
        .then (data => setUserlist(data))
    }, []) 
  
    return (
        <div className='users-content'>
                <p>Mes Amis</p>
            <div className='friends'>   
                {
                    userlist.map((u : any)=> (
                        u.username != User.username ?
                            <img key={u.id} className='user-avatar' src={u.avatar_url}></img>
                        : null
                    )
                    )
                }
            </div>  
        </div>

    );
}