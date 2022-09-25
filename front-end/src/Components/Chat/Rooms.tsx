import { useState } from 'react';
import '../../styles/Components/Chat/Rooms.css'
import RoomAdd from './RoomAdd';

export default function Rooms() {
    const[addroom, setAddroom] = useState(false);


    return (
        <div className="rooms-content">
            <h2>Rooms</h2>
            <button onClick={()=> setAddroom(true)} className="btn btn-primary" >+</button>
            {addroom ? <RoomAdd setAddroom={setAddroom} />: null}
        </div>
    );
}