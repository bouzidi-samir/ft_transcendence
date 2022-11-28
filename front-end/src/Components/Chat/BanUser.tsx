import { useState} from "react";
import { useSelector } from "react-redux";
import Alert from "../Share/Alert";

export default function BanUser(props: any) {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const [alert, setAlert] = useState(false);
    const [ban, setBan] = useState(false);
    const {toBan} = props;

async function handleBan(e: any) { 
    e.preventDefault();
    let url = `http://${hostname}:4000/chat/banMember`;
    const response = await fetch(url, {method: "POST",
    headers: {
    'Authorization': `Bearer ${User.JWT_token}`,
    'Content-Type': 'application/json',
    'cors': 'true'
},
body: JSON.stringify({
    tag : RoomActive.tag,
    username: User.username,
    toBanUsername: toBan.username,
    })
}
).then(response => response.json())
if (response === false){
    setAlert(true)
}
setBan(false);
    
}

return (
    <>
    <div className='user-icon-bloc' onClick={() => setBan(true)} >   </div>
        {ban ? 
        <>
            <div className='fond1'></div>
            <form  className="mute-form" > 
            <div onClick={()=>setBan(false)} className="cross-setting"></div>
                    <label  style={{fontSize: "16px", marginLeft: "25%"}}>
                        Veux tu vraiment banir {toBan.nickname}? 
                    </label>
                    <button  className='btn btn-primary' onClick={handleBan} >Confirmer</button>
            </form>
        </> : null} 
    )   {alert ? <Alert message="Tu n'est pas autorisé a réalié cette action." setWindow={setAlert} /> : null}
    </> 
)
}