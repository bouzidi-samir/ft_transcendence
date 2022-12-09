import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "../../Context/socket";
import Cross from "../Share/Cross";

export default function BanUser(props: any) {
    
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const [error, setError] = useState("");
    const values = Object.values(User.JWT_token);
    const [ban, setBan] = useState(false);
    const {toBan} = props;
    // const [socket, setSocket] = useState<Socket>();
    const alertBan = {
        toUsername: toBan.username,
        text: "banned"
    };

    const socket = useContext(SocketContext);

// useEffect(() => {
//     const newSocket = io('http://localhost:8000');
//     setSocket(newSocket)
// }, [setSocket])

async function handleBan(e: any) {

    e.preventDefault();
    let url = "http://localhost:4000/chat/banMember";
    const response = await fetch(url, {method: "POST",
    headers: {
    'Authorization': `Bearer ${values[0]}`,
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
socket?.emit("banned", alertBan);
setBan(false);
    
}

return (
    <div className='user-icon-bloc' onClick={() => setBan(true)} >
        {ban ? (
        <div>
            <form > 
                <Cross lastPage="/Chat" closeWinwow={setBan}/> 
                <div >
                    <p style={{color: "red"}}>
                    "Sur?!"
                    <button style={{width: "70px"}} onClick={handleBan} >Valider</button>
                    </p>
                </div>
            </form>
        </div> ) : null} 
    </div>
    );

    return (
        <div className='user-icon-bloc'></div>
    )


}