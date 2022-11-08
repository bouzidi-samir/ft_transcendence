import { Room } from "../../Slices/RoomSlice"
import "../../styles/Components/Chat/PrivateAccess.css"
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useEffect, useState } from "react";


export default function PrivateAcces(props : any) {
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const {privateRoom, setPrivate} = props;
    const dispatch = useDispatch();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

   async function handleRoom(e: any)  {
    e.preventDefault();
    let url_a = "http://localhost:4000/chat/leaveRoom";
    const res = await fetch(url_a, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${User.JWT_token}`,
        'Content-Type': 'application/json',
        'cors': 'true'
      },
      body: JSON.stringify({
            tag : RoomActive.tag,
            username: User.username,
            nickname: User.nickname,
        })
    }
    )
    let url_b = "http://localhost:4000/chat/joinRoom";
    const response = await fetch(url_b, {method: "POST",
      headers: {
        'Authorization': `Bearer ${User.JWT_token}`,
        'Content-Type': 'application/json',
        'cors': 'true'
      },
      body: JSON.stringify({
            tag : privateRoom.tag,
            username: User.username,
            nickname: User.nickname,
            password: password
        })
    }
    ).then(response => response.json())
    console.log(response);
    if (response.error) {
        setError(response.error)
        return;
    }
    dispatch({type: "RoomActive/setRoomActive",payload: response})
    dispatch({type: "User/addRoom",payload: response.tag})
    setPrivate(false);   
}   

    return (
        <>
        <div className='fond1'></div>
        <div className="privateAccess"  data-aos="fade-up" data-aos-duration="1000">
            <div onClick={()=>setPrivate(false)} className="cross-private"></div>
        <form>
            <label>Veuillez saisir le mot de passe pour rejoindre le salon {privateRoom.tag}:</label>
            <input type="password" value={password} onChange={(e: any) => setPassword(e.target.value)}></input>
            <p className="error">{error}</p>
            <button onClick={handleRoom} className="btn btn-primary">Valider</button>
        </form>
        </div>
        </>
    )
}