import { useState } from 'react';
import '../../styles/Components/Chat/RoomAdd.css'
import { Link } from 'react-router-dom';

export default function RoomAdd({setAddroom} :any) {
    const [roomName, setRoomName] = useState<string>();
    const [protectedRoom, setProtected] = useState<boolean>(false);
    const [publicRoom, setPublicRoom] = useState<boolean>(false);

    function handleChange(e : any, element : string) {
        switch(element) {
            case("name"):
                setRoomName(e.target.value);
                break;
            case("protected"):
                setProtected(true);
                setPublicRoom(false);
                break
            case("public"):
                setPublicRoom(true);
                setProtected(false);
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
                    <span>Protégée</span>
                    <input type="radio"  onChange={(e)=> handleChange(e, "protected")} 
                        value={roomName} name="type" className='room-type'></input>
                    <span>Public</span>
                    <input type="radio" onChange={(e)=> handleChange(e, "public")} 
                        value={roomName} name="type" className='room-type'></input>
                    <br></br>
                    {protectedRoom ? 
                    <>
                    <label className='pass-label'>Mot de passe:</label> 
                    <input type="password"></input> 
                    <br></br>
                    </>
                    : null}
                <button onClick={() => setAddroom(false)}  className='btn btn-primary'>Valider</button>
            </form>
        </>
    );
}