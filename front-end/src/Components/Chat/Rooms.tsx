import { useContext, useEffect, useState } from 'react';
import '../../styles/Components/Chat/Rooms.css'
import RoomAdd from './RoomAdd';
import PrivateAcces from './PrivateAccess';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import RoomCase from './RoomCase';
import { SocketContext } from '../../Context/socket';

export default function Rooms() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    let Roomlist = useSelector((state: any) => state.RoomList);
    const dispatch = useDispatch();
    const [addroom, setAddroom] = useState(false);
    const [privateAcces, setPrivate] = useState(false);
    const [alertRoom] = useState<string>("");
    let p : boolean;
    const alertMember = "NEW MEMBER !!!";

    const socket = useContext(SocketContext);

    function getRoomByname(tag : string, list : any[]) {
        let room = list.filter(e => e.tag === tag)
        return room[0];
    }

    function sortRoom(room : any) : boolean{
        if (room.privateMessage == true) {
            if (room.tag.indexOf(User.nickname) === -1)
                return false
        }
        return true
    }
    
    async function updateRoomList() {
        let url = `http://${hostname}:4000/chat/rooms`;
        let response = await fetch(url, { headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            "Content-Type": "application/json",
            'cors': 'true'
        }})
        .then(ret => ret.json()) 
        dispatch({type: "Roomlist/setRoomlist",payload: response,})
    }

    // useEffect(() => {
    //     const newSocket = io(`http://${hostname}:8000`);
    //     setSocket(newSocket)
    // }, [setSocket])

    
    const alertListener = (alertRoom: any) => {
        updateRoomList();
    }
    
    const banListener = (alert: any) => {  /// 1 ere facon
        if (alert.toUsername == User.username){ //teste avec toUsername == 'gab'
            let global = getRoomByname("global", Roomlist);
            dispatch({type: "RoomActive/setRoomActive",payload: global});
        }
    }
    
    useEffect(() => {
        socket?.on("newRoomServer", alertListener);
        return () => {
            socket?.off("newRoomServer", alertListener)
        }
    }, [alertListener])

    useEffect(() => {
        socket?.on("bannedServer", banListener);
        return () => {
            socket?.off("bannedServer", banListener)
        }
    }, [banListener])
    
    //useEffect(() => {
    //    socket?.on("newNotifServer", alertListener);
    //    return () => {
    //        socket?.off("newNotifServer", alertListener)
    //    }
    //}, [alertListener])
    
    useEffect(()=>{
        handleCheckMember(RoomActive)
    },[])

    async function handleCheckMember(room: any) {
        let url_ = `http://${hostname}:4000/chat/checkIfMember`;
            const response = await fetch(url_, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
            },
            body: JSON.stringify({
            username: User.username,
            tag : room.tag,
            })
        })
        let result  = await response.json();
        p = result.member;
    }

    async function handleCheckBan(room: any) {
        let url_ = `http://${hostname}:4000/chat/checkBan`;
            const response_ = await fetch(url_, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
            },
            body: JSON.stringify({
            username: User.username,
            tag : room.tag,
            })
        }
        )
        const banned = await response_.json();
        if (banned){
            alert("You are banned from this room");
            return;
        }
      
        if (room.tag === RoomActive.tag)
            return;
       // if (p == false){
            if (room.private && !room.privateMessage) {
                setPrivate(room)
                return;
            }
        //}
        let url_b = `http://${hostname}:4000/chat/joinRoom`;
            const response =  await fetch(url_b, {method: "POST",
            headers: {
                'Authorization': `Bearer ${User.JWT_token}`,
                'Content-Type': 'application/json',
                'cors': 'true'
            },
            body: JSON.stringify({
                tag : room.tag,
                username: User.username,
                nickname: User.nickname,
                avatar_url: User.avatar_url,
                password : ""
                //password: p[0]
            })
        }
        ).then(rep => rep.json())
        if (!response.tag)
            response.tag = room.tag
        dispatch({type: "RoomActive/setRoomActive",payload: response});
        socket?.emit("newMember", alertMember);
    }

    useEffect(() => {
        document.title = alertRoom;
    })


    return (
        <div className="rooms-content">
            <h2>Salons</h2>
            <button onClick={() => setAddroom(true)} className="btn btn-primary" >+</button>
            {addroom ? <RoomAdd setAddroom={setAddroom} /> : null}
            <div className='roomlist' >
                {
                    Roomlist.map((room: any) => 
                    sortRoom(room) ?
                        <div className='room' key={room.id + room.tag}  
                        onClick={() => {handleCheckMember(room); handleCheckBan(room)}} >
                            <RoomCase room={room}/>
                        </div>
                        : null
                    )
                }
                { privateAcces ? <PrivateAcces privateRoom={privateAcces} setPrivate={setPrivate} /> : null}
                {alertRoom ? setTimeout(function(){window.location.reload()}, 0) : null}
            </div>
        </div>
    );
}