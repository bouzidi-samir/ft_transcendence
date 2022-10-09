import '../../styles/Components/Chat/Messages.css'
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { io, Socket } from 'socket.io-client';
import MessageInput from './MessageInput';


export default function Messages() {
   const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<any[]>([]);
    const [value, setValue] = useState<string>("");
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const User = useSelector((state: any) => state.User);

    
    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        console.log('New socket', newSocket?.id);
        setSocket(newSocket)
    }, [setSocket])
    
    // Récupération des messages de la room active.

    useEffect(() => {
        let url : string = `http://localhost:4000/chat/getRoomMessages/${RoomActive.tag}`;
        const ret = fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
    }, [RoomActive])

    const send = (messageData: any) => {
      socket?.emit("messageFromClient", { messageData })
    }

    const messageListener = (message: any) => {
        setMessages([...messages, message]);
    }
    
    useEffect(() => {
        socket?.on("messageFromServer" , messageListener)
        return () => {
            socket?.off("messageFromServer", messageListener)
        }
    }, [messageListener])

    return (
        <div className="messages-content">
            <div className='room-title'>
                <div className='room-picture'></div>
                <h2>{RoomActive.tag}</h2>
                <div onClick={()=>{setMessages([])} } className='room-settings'></div>
            </div>
            <div className="conversation">
            {Object.values(messages).map((message: any, index: number) => (   
                message.messageData.room == RoomActive.tag ? 
                    <div key={index} className="buble" >
                        <img src={User.avatar_url} className="avatar-buble"></img>   
                    <div key={index} className="message-bubleA"> 
                        <span>{message.messageData.name} ({message.messageData.time}) :</span>
                         <p>{message.messageData.text}</p>
                    </div>
                    </div>
                : null
                ))}
            </div>
            <div className="send-zone">
            <MessageInput send={send}/>
        </div>
    </div>
    );
}
