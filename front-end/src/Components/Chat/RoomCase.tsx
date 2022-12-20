import { useContext, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { io, Socket } from 'socket.io-client';
import { SocketContext } from '../../Context/socket';

export default function RoomCase ({room} :any) {
    
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const [members, setMembers] = useState<any>();
    const [notifStyle, setNotifStyle] = useState("");
    const RoomActive = useSelector((state: any) => state.RoomActive); 
    const [notifs, setNotifs] = useState<any[]>([]);
    const [notif, setNotif] = useState("");
    // const [socket, setSocket] = useState<Socket>();

    // useEffect(() => {
    //     const newSocket = io(`http://${hostname}:8000`);
    //     setSocket(newSocket)
    // }, [setSocket])


    const socket = useContext(SocketContext);

    const alertListener = (alert: any) => {
        setNotifs([...notifs,alert]);
        let roomnotif = {alert}.alert.alertNotif.room;
        if (roomnotif !== RoomActive.tag && roomnotif == room.tag){
            setNotifStyle('goldenrod')
            setNotif({alert}.alert.alertNotif.text)
        }
    }
    
    useEffect(() => {
        socket?.on("newNotifServer", alertListener);
        return () => {
            socket?.off("newNotifServer", alertListener)
        }
    }, [alertListener])

    useEffect(() => {
        if (RoomActive.tag == room.tag)
            setNotifStyle("blueviolet");
        else
            setNotifStyle("")
    }, [RoomActive]
    ) 
    
    useEffect (() => {
        let url = `http://${hostname}:4000/chat/getRoomMembers/${room.tag}`
        fetch(url, {    headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },})
        .then(response => response.json())
        .then(data => setMembers(data[0]))
    }, []    
    )

    return (  
            <div style={{background : notifStyle}} className="roomcase" onClick={() => {setNotif("")}}>
                    {room.privateMessage ? <div className='message-avatar'></div> : null}
                    {room.tag !== "global" &&  !room.privateMessage ? <div className='room-avatar'></div> : null }
                    {room.tag === "global" ? <div className='waiting-avatar'></div> : null }
                    <div className="room-infos">
                    {room.tag !== "global" ? <p className="room-tag">{room.tag}</p> : null}
                        <p style={{fontSize: '12px'}} className="room-notif">{notif}</p>
                    </div>
            </div>
    )
}