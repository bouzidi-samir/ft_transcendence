import '../../styles/Components/Home/Notifs.css'
import { useState, useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { io, Socket } from "socket.io-client";
import { Link } from 'react-router-dom';


export default function Notifs() {

    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const [socket, setSocket] = useState<Socket>();
    const [notifs, setNotifs] = useState<any[]>([]);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    


    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket)
    }, [setSocket])
  
    const alertListener = (alert: any) => {
        setNotifs([...notifs,alert]);
    }

    useEffect(() => {
        socket?.on("newNotifServer", alertListener);
        return () => {
            socket?.off("newNotifServer", alertListener)
        }
    }, [alertListener])

// 
 
console.log('room active tag', RoomActive.tag)

    return (
        <div className='notifs-content'>
                <p>Notifications</p>
                {Object.values(notifs).map((alert: any, index: number) => (   
                    <div key={index} > 
                         <Link to="/Chat"  onClick={() => dispatch({type: "RoomActive/setRoomActive",payload: {tag:alert.alertNotif.room}})}> <p>{alert.alertNotif.text} from: {alert.alertNotif.from} in room: {alert.alertNotif.room}</p></Link>
                    </div>
                ))}
        </div>
    );
}
