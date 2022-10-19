import { useEffect, useState } from "react"






export default function RoomCase ({room} :any) {
    
    const [members, setMembers] = useState<any>();
    
    useEffect (() => {
        let url = `http://localhost:4000/chat/getRoomMembers/${room.tag}`
        fetch(url).then(response => response.json())
        .then(data => setMembers(data[0]))


    }, []    
    )


    return (
        <>
                {room.privateMessage ? <div className='message-avatar'></div>
                   : <div className='room-avatar'></div>
                }
                <p>{room.tag}</p>
       </>
    )
}