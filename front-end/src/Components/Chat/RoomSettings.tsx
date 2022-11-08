import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Alert from '../Share/Alert';
import '../../styles/Components/Chat/RoomSetting.css'

export default function RoomSettings() {
    
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const [adminList, setAdminList] = useState<any>([])
    const[isAdmin, setIsAdmin] = useState(false);
    const [alert, setAlert] = useState(false);
    const [roomName, setRoomName] = useState<string>(RoomActive.tag);
    const [privateRoom, setPrivate] = useState<boolean>(RoomActive.private);
    const [publicRoom, setPublicRoom] = useState<boolean>(RoomActive.public);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const values = Object.values(User.JWT_token);

    useEffect(() => {
        setPrivate(RoomActive.private);
        setPublicRoom(RoomActive.public);
        setPassword(RoomActive.password);
        let url = `http://localhost:4000/chat/getRoomAdmin/${RoomActive.tag}`;
        fetch(url).then(ret => ret.json()).then(ret => setAdminList(ret))
    }, [RoomActive]
    )

    async function updateRoomList() {
        let url = `http://localhost:4000/chat/rooms`;
        let response = await fetch(url).then(ret => ret.json()) 
        dispatch({type: "Roomlist/setRoomlist",payload: response,})
    }

    function setRoom() : any {
        if (!adminList.some((e : any) => e.nickname == User.nickname )) {
            setAlert(true);
            return ;
        }
        setRoomName(RoomActive.tag);
        setIsAdmin(true)
    }

    async function handleForm(e: any) {

        e.preventDefault();
        let roomUpdate : any = {
            tag: roomName,
            public: publicRoom,
            private: privateRoom,
            privateMessage: false,
            password: password
        }
        let url = `http://localhost:4000/chat/updateRoom/${RoomActive.tag}`;
        const response = await  fetch(url, {method : 'POST',
        headers: {
            'Authorization': `Bearer ${values[0]}`,
            "Content-Type": "application/json",
            'cors': 'true'
        },
        body: JSON.stringify(roomUpdate)
        }).then(response => response.json())
        if (response.error) {
            setError(response.error)
            return;
        }
        updateRoomList();
        dispatch({type: "RoomActive/setRoomActive",payload: roomUpdate});
       setIsAdmin(false);
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
            <div  onClick={setRoom} className='room-settings'></div>
            {
                isAdmin ? 
                <>
                    <div className='fond1'></div>
                    <form className="room-settingsForm" data-aos="fade-up" data-aos-duration="1000">
                        <div onClick={()=>setIsAdmin(false)} className="cross-setting"></div>
                        <div className='group-avatar'></div>
                        <h2>Configuration du salon </h2>
                        <label>Nom du salon:</label>       
                        <input type="text"  onChange={(e)=> handleChange(e, "name")}  
                           value={roomName} className='room-name' ></input>
                        <label>Type:</label>
                    <span>Privée</span>
                    <input type="radio"  onChange={(e)=> handleChange(e, "private")} 
                        value={roomName} name="type" className='room-type' checked= {privateRoom}>
                        </input>
                    <span>Public</span>
                    <input type="radio" onChange={(e)=> handleChange(e, "public")} 
                        value={roomName} name="type" className='room-type' checked= {publicRoom}>

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
                    <button onClick={handleForm}  className='btn btn-primary'>Valider</button>
                    </form>
                </>
                : null
            }
            {alert ? <Alert message="Cet action est réservée aux admins du channel." setWindow={setAlert} /> : null}
        </>
    )
}