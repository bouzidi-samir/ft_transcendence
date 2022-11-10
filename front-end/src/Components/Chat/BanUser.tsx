import { useState } from "react";
import { useSelector } from "react-redux";
import Cross from "../Share/Cross";

export default function BanUser(props: any) {
    
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const [error, setError] = useState("");
    const [ban, setBan] = useState(false);
    const {toBan} = props;


async function handleBan(e: any) {

    e.preventDefault();
    let url = "http://localhost:4000/chat/banMember";
    const response = await fetch(url, {method: "POST",
    headers: {
    'Authorization': `Bearer ${User.JWT_token}`,
    'Content-Type': 'application/json',
    'cors': 'true'
},
body: JSON.stringify({
    tag : RoomActive.tag,
    username: User.username,
    toBanUsername: toBan.userName,
    })
}
).then(response => response.json())
    console.log(response);
if (response == false){
    alert("You are not allowed to Ban this user");
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
                    <button onClick={handleBan} >Confirmer</button>
            </form>
        </> : null} 
    );
    </> 
)
}