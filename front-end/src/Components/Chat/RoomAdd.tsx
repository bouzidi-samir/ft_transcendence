import { useState } from 'react';
import '../../styles/Components/Chat/RoomAdd.css'
import { Link } from 'react-router-dom';

export default function RoomAdd({setAddroom} :any) {
 
    return (
        <>
            <form className="addroom-content" data-aos="fade-up" data-aos-duration="1000">
                <div className='group-avatar'></div>
                <label>Nom de la room:</label>       
                    <input type="text" className='room-name'></input>
                <label>Type:</label>
                    <span>Privée</span>
                    <input type="radio" name="privée" className='room-type'></input>
                    <span>Public</span>
                    <input type="radio" name="privée" className='room-type'></input>
                    <br></br>
                <button onClick={() => setAddroom(false)}  className='btn btn-primary'>Valider</button>
            </form>
        </>
    );
}