
import { useContext, useState } from 'react';
import '../../styles/Components/Chat/RoomAdd.css'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import Cross from '../Share/Cross';
import { User } from "../../Slices/UserSlice";
import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { couldStartTrivia } from 'typescript';
import { SocketContext } from '../../Context/socket';


export default function RoomAdd({setAddroom} :any) {
    const User = useSelector((state: any) => state.User);
    const Roomlist = useSelector((state: any) => state.RoomList);
    const dispatch = useDispatch();
    const [roomName, setRoomName] = useState<string>();
    const [privateRoom, setPrivate] = useState<boolean>(false);
    const [publicRoom, setPublicRoom] = useState<boolean>(true);
    const [password, setPassword] = useState("");
    // const [socket, setSocket] = useState<Socket>();
    const [error, setError] = useState("");


    const values = Object.values(User.JWT_token);
    const alertRoom = "NEW ROOM AVAILABLE !!!";
    const socket = useContext(SocketContext);

    // useEffect(() => {
    //     const newSocket = io('http://localhost:8000');
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
            password: password,
        }
        let url = "http://localhost:4000/chat/createRoom"
        
        const response = await  fetch(url, {method : 'POST',
        headers: {
            'Authorization': `Bearer ${values[0]}`,
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

    if (newRoom.public == true){
        socket?.emit("newRoomClient", alertRoom);
    }
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
        <div className="addroom-content" data-aos="fade-up" data-aos-duration="1000">
                <Cross lastPage="/Home" closeWinwow={setAddroom}/> 
            <form >
                <div className='group-avatar'></div>
                <h2>Informations du salon </h2>
                <hr></hr>
                <label>Nom du salon:</label>       
                    <input type="text"  onChange={(e)=> handleChange(e, "name")} 
                    value={roomName} className='room-name' placeholder='Nom du salon'></input>
                <label>Type:</label>
                    <span>Privée</span>
                    <input type="radio"  onChange={(e)=> handleChange(e, "private")} 
                        value={roomName} name="type" className='room-type'></input>
                    <span>Public</span>
                    <input type="radio" onChange={(e)=> handleChange(e, "public")} 
                        value={roomName} name="type" className='room-type'></input>
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
    );
}