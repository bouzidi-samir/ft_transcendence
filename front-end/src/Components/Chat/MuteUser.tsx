
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useState } from "react";
import Cross from "../Share/Cross";

export default function MuteUser(props : any) {

const User = useSelector((state: any) => state.User);
const RoomActive = useSelector((state: any) => state.RoomActive);
const [error, setError] = useState("");
const values = Object.values(User.JWT_token);
const [mute, setMute] = useState(false);
const [minutes, setMinutes] = useState("");
const {toMute} = props;


async function handleMute(e: any) {

    e.preventDefault();
    let url = "http://localhost:4000/chat/muteMember";
    const response = await fetch(url, {method: "POST",
    headers: {
    'Authorization': `Bearer ${values[0]}`,
    'Content-Type': 'application/json',
    'cors': 'true'
},
body: JSON.stringify({
    tag : RoomActive.tag,
    username: User.username,
    toMuteUsername: toMute.nickname,
    minutes: minutes
    })
}
).then(response => response.json())
setMinutes("");
setMute(false);
    
}

return (
    <div className='user-icon-mute' onClick={() => setMute(true)} >
        {mute ? (
        <div>
            <form > 
                <Cross lastPage="/Chat" closeWinwow={setMute}/> 
                <div >
                    <p>
                    <input style={{width: "70px"}} value={minutes} 
                    onChange={(e)=> setMinutes(e.target.value)} placeholder='Minutes' ></input> 
                    <button style={{width: "70px"}} onClick={handleMute} >Valider</button>
                    </p>
                </div>
            </form>
        </div> ) : null} 
    </div>
    );

}
