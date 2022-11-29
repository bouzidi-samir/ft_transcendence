import { useEffect, useState } from "react"
import { useSelector } from "react-redux";






export default function RoomCase ({room} :any) {
    
    const [members, setMembers] = useState<any>();
    const RoomActive = useSelector((state: any) => state.RoomActive);
    
    useEffect (() => {
        let url = `http://localhost:4000/chat/getRoomMembers/${room.tag}`
        fetch(url).then(response => response.json())
        .then(data => setMembers(data[0]))


    }, []    
    )
    // console.log('room', room)
    // console.log('room active', RoomActive)

    return (
        <>
                {room.privateMessage ? <div className='message-avatar'></div>
                   : <div className='room-avatar'></div>
                }
                <p>{room.tag}</p>
       </>
    )
}