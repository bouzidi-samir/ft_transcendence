import "../../styles/Components/Chat/MuteUser.css"
import { useSelector } from "react-redux";
import { useState } from "react";
import Alert from "../Share/Alert";

export default function MuteUser(props : any) {
const {hostname} = document.location;
const User = useSelector((state: any) => state.User);
const RoomActive = useSelector((state: any) => state.RoomActive);
const [mute, setMute] = useState(false);
const [minutes, setMinutes] = useState("");
const [alert, setAlert] = useState(false);
const {toMute} = props;


async function handleMute(e: any) {

    e.preventDefault();
    let url = `http://${hostname}:4000/chat/muteMember`;
    const response = await fetch(url, {method: "POST",
    headers: {
    'Authorization': `Bearer ${User.JWT_token}`,
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
if (response == false){
    setAlert(true)
}
setMute(false);
}

return (
   <>
    <div className='user-icon-mute' onClick={() => setMute(true)} > </div>
        {mute ? 
        <>
            <div className='fond1'></div>
            <form className="mute-form"> 
            <div onClick={()=>setMute(false)} className="cross-setting"></div>
                   <h2>Mute Mode</h2>
                   <label>Durée:</label>   
                    <br></br> 
                    <input value={minutes} 
                    onChange={(e)=> setMinutes(e.target.value)} placeholder='Minutes' ></input> 
                    <br></br>
                    <button className='btn btn-primary' onClick={handleMute} >Valider</button>
            </form>
        </>  : null} 
        {alert ? <Alert message="Tu n'est pas autorisé a réalié cette action." setWindow={setAlert} /> : null}
    </>
)
}
