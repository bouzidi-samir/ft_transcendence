import { useState } from 'react';
import '../../styles/Components/Chat/Rooms.css'
import RoomAdd from './RoomAdd';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function Rooms() {
    const Roomlist = useSelector((state: any) => state.RoomList);
    const dispatch = useDispatch();
    const[addroom, setAddroom] = useState(false);
    
    function handleRoom() : void {



    }

    return (
        <div className="rooms-content">
            <h2>Rooms</h2>
            <button onClick={()=> setAddroom(true)} className="btn btn-primary" >+</button>
            {addroom ? <RoomAdd setAddroom={setAddroom} />: null}
            <div className='roomlist'>
                {
                    Roomlist.map((room : any) => 
                        <div className='room' key={room.id}>
                            <div onClick={handleRoom} className='room-avatar'></div>
                            <p>{room.tag}</p>
                        </div>
                )
                }
            </div>
        </div>
    );
}