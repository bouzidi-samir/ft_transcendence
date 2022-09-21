import { useState } from 'react';
import '../../styles/Components/Rooms.css'

export default function Rooms() {
    const[addroom, setAddroom] = useState(false);


    return (
        <div className="rooms-content">
            <h2>Rooms</h2>
            <hr></hr>
            <button className="btn btn-primary" >+</button>
        </div>
    );
}