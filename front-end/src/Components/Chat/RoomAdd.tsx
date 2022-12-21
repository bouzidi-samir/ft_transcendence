import { useContext, useState } from 'react';
import '../../styles/Components/Chat/RoomAdd.css'
import {useDispatch, useSelector} from 'react-redux';
import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { SocketContext } from '../../Context/socket';

export default function RoomAdd({setAddroom} :any) {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const [roomName, setRoomName] = useState<string>();
    const [privateRoom, setPrivate] = useState<boolean>(false);
    const [publicRoom, setPublicRoom] = useState<boolean>(true);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const alertRoom = "NEW ROOM AVAILABLE !!!";

    const socket = useContext(SocketContext);
    
    // useEffect(() => {
    //     const newSocket = io(`http://${hostname}:8000`);
    //     setSocket(newSocket)
    // }, [setSocket])
    
    
   async function handleForm(e: any)  {
        e.preventDefault();
        let newRoom : any = {
            username: User.username,
            tag: roomName,
            public: publicRoom,
            private: privateRoom,
            privateMessage: false,
            password: password
        }
        let url = `http://${hostname}:4000/chat/createRoom`;
        
        const response = await  fetch(url, {method : 'POST',
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            "Content-Type": "application/json",
            'cors': 'true'
        },
        body: JSON.stringify(newRoom)
    }).then(response => response.json())
    
    if (response.error) {
        setError(response.error)
        return;
    }
    dispatch({type: "Roomlist/addRoom", payload: newRoom,});
    setAddroom(false)
    socket?.emit("newRoomClient", alertRoom);
}

    function handleChange(e : any, element : string) {
        switch(element) {
            case("name"):
                setRoomName(e.target.value);
                break;
            case("private"):
                setPrivate(true);
                setPublicRoom(false);
                break
            case("public"):
                setPublicRoom(true);
                setPrivate(false);
                break;
        }
    }

    return (
        <>
        <div className='fond1'></div>
        <div className="addroom-content" data-aos="fade-up" data-aos-duration="1000">
            <div onClick={()=>setAddroom(false)} className="cross-addroom"></div> 
            <form >
                <div className='group-avatar'></div>
                <h2>Informations du salon </h2>
                <hr></hr>
                <label>Nom du salon:</label>       
                    <input type="text"  onChange={(e)=> handleChange(e, "name")} 
                     className='room-name' placeholder='Nom du salon'></input>
                <label>Type:</label>
                    <span>Privée</span>
                    <input type="radio"  onChange={(e)=> handleChange(e, "private")} 
                         name="type" className='room-type'></input>
                    <span>Public</span>
                    <input type="radio" onChange={(e)=> handleChange(e, "public")} 
                         name="type" className='room-type' checked={publicRoom}>
                        </input>
                    <br></br>
                    <div className='pass-zone'>
                    {privateRoom ? 
                    <>
                    <label className='pass-label'>Mot de passe:</label> 
                    <input className='password-input' type="password" value={password} 
                    onChange={(e)=> setPassword(e.target.value)} placeholder='Mot de passe' ></input> 
                    </>
                    : null}
                    <p >{error}</p>
                    </div>
            </form>
                <button onClick={handleForm}  className='btn btn-primary'>Valider</button>
        </div>
        </>
    );
}