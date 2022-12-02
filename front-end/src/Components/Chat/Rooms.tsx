import { useEffect, useState } from 'react';
import '../../styles/Components/Chat/Rooms.css'
import RoomAdd from './RoomAdd';
import PrivateAcces from './PrivateAccess';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import RoomCase from './RoomCase';


export default function Rooms() {
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    let Roomlist = useSelector((state: any) => state.RoomList);
    const dispatch = useDispatch();
    const [addroom, setAddroom] = useState(false);
    const [privateAcces, setPrivate] = useState(false);
    const [socket, setSocket] = useState<Socket>();
    const [alertRoom, setAlertRoom] = useState<string>("");
    // const [alertBanned, setAlertBanned] = useState<any>({}); //// 2 eme

    const values = Object.values(User.JWT_token);
    const [member, setMember] = useState<{password: string; member: boolean}>({password: "", member: false});
    let p : [string | boolean][];


    function getRoomByname(tag : string, list : any[]) {
        let room = list.filter(e => e.tag == tag)
        return room[0];
    }

    function sortRoom(room : any) : boolean{
        if (room.privateMessage == true) {
            if (room.tag.indexOf(User.nickname) == -1)
                return false
        }
        return true
    }
    
    async function updateRoomList() {
        let url = 'http://localhost:4000/chat/rooms';
        let response = await fetch(url, { headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            "Content-Type": "application/json",
            'cors': 'true'
        }})
        .then(ret => ret.json()) 
        dispatch({type: "Roomlist/setRoomlist",payload: response,})
    }


    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket)
    }, [setSocket])

    const alertListener = (alertRoom: string) => {
        // setAlertRoom(alertRoom);
        updateRoomList();
    }

    const banListener = (alert: any) => {  /// 1 ere facon
        // setAlertBanned(alert)
        if (alert.toUsername == User.username){ 
            console.log('OK tata', alert);
            dispatch({type: "RoomActiveSlice/setRoomActive",payload: 'global'})
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
    
    // useEffect(() => { ///// 2 eme facon
    //     if (alertBanned.toUsername == "gab"){
    //         console.log('OK toto', alertBanned);
    //     }
        
    // }, [banListener])
    
    useEffect(()=>{
        handleCheckMember(RoomActive)
    },[])

    async function handleCheckMember(room: any) {
            
        let url_ = "http://localhost:4000/chat/checkIfMember";
            const response = await fetch(url_, {method: "POST",
            headers: {
            'Authorization': `Bearer ${values[0]}`,
            'Content-Type': 'application/json',
            'cors': 'true'
            },
            body: JSON.stringify({
            username: User.username,
            tag : room.tag,
            })
        })
        let result  = await response.json();
        p = Object.values(result);
    }

    async function handleCheckBan(room: any) {
        
        let url_ = "http://localhost:4000/chat/checkBan";
            const response_ = await fetch(url_, {method: "POST",
            headers: {
            'Authorization': `Bearer ${values[0]}`,
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
        if (room.tag == RoomActive.tag)
            return;
        if (room.private && !room.privateMessage && !p[1]) {
            setPrivate(room)
            return;
        }

        let url_a = "http://localhost:4000/chat/leaveRoom";
        await fetch(url_a, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${values[0]}`,
                'Content-Type': 'application/json',
                'cors': 'true'
            },
            body: JSON.stringify({
                tag : RoomActive.tag,
                username: User.username,
                nickname: User.nickname,
            })
        })

       

        let url_b = "http://localhost:4000/chat/joinRoom";
            const response =  await fetch(url_b, {method: "POST",
            headers: {
                'Authorization': `Bearer ${values[0]}`,
                'Content-Type': 'application/json',
                'cors': 'true'
            },
            body: JSON.stringify({
                tag : room.tag,
                username: User.username,
                nickname: User.nickname,
                avatar_url: User.avatar_url,
                password: p[0]
            })
        }
        ).then(rep => rep.json())
        if (!response.tag)
            response.tag = room.tag;
        dispatch({type: "User/addRoom",payload: response.tag})
        dispatch({type: "RoomActive/setRoomActive",payload: response}); 
        
    }

    useEffect(() => {
        document.title = alertRoom;
    })

    return (
        <div className="rooms-content">
            <h2>Rooms</h2>
            <button onClick={() => setAddroom(true)} className="btn btn-primary" >+</button>
            {addroom ? <RoomAdd setAddroom={setAddroom} /> : null}
            <div className='roomlist' >
                {
                    Roomlist.map((room: any) => 
                    
                        <div  className='room' key={room.id}  onClick={() => {handleCheckMember(room); handleCheckBan(room)}} >
                            <RoomCase room={room}/>
                        </div>
                    )
                }
                { privateAcces ? <PrivateAcces privateRoom={privateAcces} setPrivate={setPrivate} /> : null}
                {alertRoom ? setTimeout(function(){window.location.reload()}, 0) : null}
            </div>
        </div>
    );
}