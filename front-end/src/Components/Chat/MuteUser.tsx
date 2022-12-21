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
const [alertmess, setAlertMess] = useState("Tu n'est pas autorisé a réalisé cette action.");
const {toMute} = props;


async function handleMute(e: any) {
   
    e.preventDefault();
    let ok : Boolean = false;
    // let isnum = minutes.match(/ˆ\d+$/);
    for(let i = 0; i < minutes.length ; i++){
        if ((minutes[i] < "0" || minutes[i] > "9"))
            ok = true
    }
    if (ok == true)
    {
        setAlertMess("Merci de rentrer un vrai chiffre entre 1 et 100");
        setAlert(true)
        return;
    }
    if (parseInt(minutes) < 0 ||  parseInt(minutes) > 100 ) {
        setAlertMess("Merci de rentrer un chiffre entre 1 et 100");
        setAlert(true)
        return
    }
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
    toMuteUsername: toMute.username,
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
        {alert ? <Alert message={alertmess} setWindow={setAlert} /> : null}
    </>
)
}
