import { useState } from 'react';
import '../../styles/Components/Chat/RoomAdd.css'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function RoomAdd({setAddroom} :any) {
    const User = useSelector((state: any) => state.User);
    const [roomName, setRoomName] = useState<string>();
    const [privateRoom, setPrivate] = useState<boolean>(false);
    const [publicRoom, setPublicRoom] = useState<boolean>(false);

    function handleForm(e: any) : void {
        
        e.preventDefault();
        let url = "http://localhost:4000/chat/createRoom"
        let response = fetch(url, {
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickname: User.nickname,
                tag: roomName,
               // public: publicRoom,
               // private: privateRoom,
                password: null
            })
        }
        ).then(rep => rep.json())
        .then(data =>console.log(data))
        .then(setAddroom(false))
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
                    {privateRoom ? 
                    <>
                    <label className='pass-label'>Mot de passe:</label> 
                    <input type="password"></input> 
                    <br></br>
                    </>
                    : null}
                <button onClick={handleForm}  className='btn btn-primary'>Valider</button>
            </form>
        </>
    );
}