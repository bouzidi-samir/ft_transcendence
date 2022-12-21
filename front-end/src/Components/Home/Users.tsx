import '../../styles/Components/Home/Users.css'
import { useState, useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import Friend from './Firend';

export default function Users() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const dispatch = useDispatch();
    const values = Object.values(User.JWT_token);
    const [friends, setFriends] = useState<any[]>([]);

    async function fetchData() {
        let url : string = `http://${hostname}:4000/users/getAllMyFriendships`;
        const response = await fetch(url, {method: 'POST',
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            "Content-Type": "application/json",
            'cors': 'true'
        },
        body: JSON.stringify({
            fromUsername: User.username,
            })
        })
        let result = await response.json();
        setFriends([...result]);
    }

    useEffect( () => {    
        fetchData();
    }, [])
    
    return (
        <div className='users-content'>
                <p>Mes Amis</p>
            <div className='friends'>   
                {
                    Object.values(friends).map((f : any, index: number)=> (
                        f.fromUsername == User.username ?
                        <Friend key={index} friend={f}/>
                        : null
                    )
                    )
                }
            </div>  
        </div>

    );
}