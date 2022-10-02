import { useState } from 'react';
import '../../styles/Components/Chat/Rooms.css'
import RoomAdd from './RoomAdd';
import PrivateAcces from './PrivateAcces';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function Rooms() {
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const Roomlist = useSelector((state: any) => state.RoomList);
    const dispatch = useDispatch();
    const[addroom, setAddroom] = useState(false);
    const[privateAcces, setPrivate] = useState(false);
    
    async function handleRoom(room : any)  {
        
        if (room.private) {
            setPrivate(true)
            return;
        }
        let url_a = "http://localhost:4000/chat/leaveRoom";
        await fetch(url_a, {
          method: "POST",
          headers: {
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
        const response =  fetch(url_b, {method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'cors': 'true'
          },
          body: JSON.stringify({
                tag : room.tag,
                username: User.username,
                nickname: User.nickname,
            })
        }
        ).then(rep => rep.json())
        .then(data => 
            dispatch({
                type: "RoomActive/setRoomActive",
                payload: data,
              })
        );
    }

    return (
        <div className="rooms-content">
            <h2>Rooms</h2>
            <button onClick={()=> setAddroom(true)} className="btn btn-primary" >+</button>
            {addroom ? <RoomAdd setAddroom={setAddroom} />: null}
            <div className='roomlist'>
                {
                    Roomlist.map((room : any) => 
                        <div className='room' key={room.id} onClick={
                            ()=>  handleRoom(room) } >
                            <div className='room-avatar'></div>
                            <p>{room.tag}</p>
                        </div>
                    )
                }
                {privateAcces ? <PrivateAcces setPrivate={setPrivate}/> : null}
            </div>
        </div>
    );
}