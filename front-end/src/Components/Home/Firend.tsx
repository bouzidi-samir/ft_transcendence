import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import Users from "./Users";
import { Link } from 'react-router-dom';

export default function Friend(props: any) {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const friendtoGet = props.friend.toUsername; 
    const [friend, setFriend]  = useState(User); 
 
    useEffect(() => {
        const url = `http://${hostname}:4000/users/search/${friendtoGet}`
        fetch(url, {headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        }})
        .then(response => response.json())
        .then (data => setFriend(data));
    }, []
    )

    return (
        <>
        <Link  to={"/UserProfil/" + friend.username} style={{textDecoration: 'none'}} state={{toBlock: {friend}}} >
       <div className="friend-case">
                <img src={friend.avatar_url}></img>
                <p>{friend.nickname}</p>            
        </div>
        </Link>
        </>
    )

}
