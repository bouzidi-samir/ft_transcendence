import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { io, Socket } from 'socket.io-client';

export default function QuitRoom() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    let Roomlist = useSelector((state: any) => state.RoomList);
    const dispatch = useDispatch();
    const alertMember = "NEW MEMBER !!!";
    const [socket, setSocket] = useState<Socket>();

    function getRoomByname(tag : string, list : any[]) {
        let room = list.filter(e => e.tag == tag)
        return room[0];
    }

    async function quitRoom(room: any) {
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
        })
        }
        ).then(rep => rep.json())
        if (!response.tag)
            response.tag = room.tag;
        let global = getRoomByname("global", Roomlist);
        dispatch({type: "RoomActive/setRoomActive",payload: global});
       socket?.emit("newMember", alertMember);
    }

    return (
        <>
            <div onClick={quitRoom} className='room-picture'></div>
        </>
    )


}