import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { io, Socket } from 'socket.io-client';

export default function RoomCase ({room} :any) {
    
    const [members, setMembers] = useState<any>();
    const [notifStyle, setNotifStyle] = useState("");
    const dispatch = useDispatch();
    const RoomActive = useSelector((state: any) => state.RoomActive); 
    const [notifs, setNotifs] = useState<any[]>([]);
    const [notif, setNotif] = useState("");
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket)
    }, [setSocket])


    const alertListener = (alert: any) => {
        setNotifs([...notifs,alert]);
        let roomnotif = {alert}.alert.alertNotif.room;
        if (roomnotif != RoomActive.tag && roomnotif == room.tag){
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
        let url = `http://localhost:4000/chat/getRoomMembers/${room.tag}`
        fetch(url).then(response => response.json())
        .then(data => setMembers(data[0]))
    }, []    
    )

    return (
        <div style={{background : notifStyle}} className="roomcase" onClick={() => {setNotif("")}}>
                {room.privateMessage ? <div className='message-avatar'></div>
                   : <div className='room-avatar'></div>
                }
                <div className="room-infos">
                    <p className="room-tag">{room.tag}</p>
                    <p className="room-notif">{notif}</p>
                </div>
       </div>
    )
}