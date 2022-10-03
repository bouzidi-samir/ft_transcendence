
import { useState } from 'react';
import '../../styles/Components/Chat/RoomAdd.css'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import Cross from '../Share/Cross';

export default function RoomAdd({setAddroom} :any) {
    const User = useSelector((state: any) => state.User);
    const Roomlist = useSelector((state: any) => state.RoomList);
    const dispatch = useDispatch();
    const [roomName, setRoomName] = useState<string>();
    const [privateRoom, setPrivate] = useState<boolean>(false);
    const [publicRoom, setPublicRoom] = useState<boolean>(false);
    const [password, setPassword] = useState("");

    function handleForm(e: any) : void {
        e.preventDefault();
        let newRoom : any = {
            username: User.username,
            nickname: User.nickname,
            tag: roomName,
            public: publicRoom,
            private: privateRoom,
            password: password
        }
        dispatch({
            type: "Roomlist/addRoom",
            payload: newRoom,
          });
        let url = "http://localhost:4000/chat/createRoom"
        let response = fetch(url, {method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRoom)
        }).then(setAddroom(false))
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
            <form className="addroom-content" data-aos="fade-up" data-aos-duration="1000">
                {/* <Cross/> */}
                <div className='group-avatar'></div>
                <label>Nom de la room:</label>       
                    <input type="text"  onChange={(e)=> handleChange(e, "name")} 
                    value={roomName} className='room-name'></input>
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
                    <input className='password' type="password" value={password} onChange={(e)=> setPassword(e.target.value)} ></input> 
                    </>
                    : null}
                    </div>
                <button onClick={handleForm}  className='btn btn-primary'>Valider</button>
            </form>
        </>
    );
}