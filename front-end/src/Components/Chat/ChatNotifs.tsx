import '../../styles/Components/Home/Notifs.css'
import { useState, useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { io, Socket } from "socket.io-client";
import { Link } from 'react-router-dom';
// import mp3 from '../../styles/Sound/new.mp3'
// import { Howl } from "howler";
import { SocketContext } from '../../Context/socket';

export default function Notifs() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const [notifs, setNotifs] = useState<any[]>([]);
    const dispatch = useDispatch();
    const Roomlist = useSelector((state: any) => state.RoomList);

    const socket = useContext(SocketContext);
    
    // useEffect(() => {
    //     const newSocket = io(`http://${hostname}:8000`);
    //     setSocket(newSocket)
    // }, [setSocket])
  
    const alertListener = (alert: any) => {
        setNotifs([...notifs,alert]);
    }

    useEffect(() => {
        socket?.on("newNotifServer", alertListener);
        return () => {
            socket?.off("newNotifServer", alertListener)
        }
    }, [alertListener])

return (
        <div className='notifs-content'>
            
                <p >Messages</p>
                
                { Object.values(notifs).map((alert: any, index: number) => (  
                    <div key={index} > 
                   
                   { (Roomlist.some((e : any) => (alert.alertNotif.room == e.tag) && (alert.alertNotif.room != RoomActive.tag))) ? (
                    <Link to="/Chat"  onClick={() => dispatch({type: "RoomActive/setRoomActive",payload: {tag:alert.alertNotif.room}})}> <p>{alert.alertNotif.text} from: {alert.alertNotif.from} in room: {alert.alertNotif.room}</p></Link>
                    )  : (null)
                   }                  
                    </div>
                )) }
        </div>
    );
}