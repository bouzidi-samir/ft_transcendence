import '../../styles/Components/Home/Users.css'
import { useState, useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function Users() {

    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const dispatch = useDispatch();
    const values = Object.values(User.JWT_token);
    const [friends, setFriends] = useState<any[]>([]);

    async function fetchData() {
        let url : string = "http://localhost:4000/users/getAllMyFriendships";
        const response = await fetch(url, {method: 'POST',
        headers: {
            'Authorization': `Bearer ${values[0]}`,
            "Content-Type": "application/json",
            'cors': 'true'
        },
        body: JSON.stringify({
            fromUsername: User.username,
            })
        })
        let result = await response.json();
        setFriends([...result]);
        console.log('response', result);
    }

    useEffect( () => {    
        fetchData();
    }, [])
    
    return (
        <div className='users-content'>
                <p style={{color:"yellow"}}>Mes Amis</p>
            <div className='friends'>   
                {
                    Object.values(friends).map((f : any)=> (
                        <div key={f.id}>
                        {/* <img  className='user-avatar' src={f.avatar_url}></img> */}
                        <p>{f.toUsername}</p>
                        </div>
                    )
                    )
                }
            </div>  
        </div>

    );
}