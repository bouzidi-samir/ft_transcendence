import "../../styles/Components/Chat/PrivateAccess.css"
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useState } from "react";
import { io, Socket } from 'socket.io-client';


export default function PrivateAcces(props : any) {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const {privateRoom, setPrivate} = props;
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [socket, setSocket] = useState<Socket>();
    const alertMember = "NEW MEMBER !!!";

   async function handleRoom(e: any)  {
    e.preventDefault();
    if (!password) {
        setError("Merci de rentrer un password.");
        return;
    }
    let url_a = `http://${hostname}:4000/chat/leaveRoom`;
    await fetch(url_a, {
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
    let url_b = `http://${hostname}:4000/chat/joinRoom`;
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
            avatar_url: User.avatar_url,
            password: password
        })
    }
    ).then(response => response.json())
    if (response.error) {
        setError(response.error)
        return;
    }
    dispatch({type: "RoomActive/setRoomActive",payload: response})
    socket?.emit("newMember", alertMember);
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