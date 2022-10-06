import '../../styles/Components/Chat/Messages.css'
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { io, Socket } from 'socket.io-client';
import MessageInput from './MessageInput';

export default function Messages() {
   const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);
    const [alert, setAlert] = useState<string>();
    const [value, setValue] = useState<string>("");
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const User = useSelector((state: any) => state.User);

    
    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        console.log('New socket', newSocket?.id);
        setSocket(newSocket)
    }, [setSocket])
    
    const send = (messageData: any) => {
      socket?.emit("messageFromClient", messageData.name, ' ', messageData.time, ' ', '"', messageData.text, '"')
    }

    const messageListener = (message: string) => {
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
                <div className='room-settings'></div>
            </div>
            <div className="conversation">
            {messages.map((message: string, index: number) => (   
                    <div key={index}>    
                         <div>{message}</div>
                    </div>
                ))}
            </div>
            <div className="send-zone">
            <MessageInput send={send}/>
            {/* <input value={value} onChange={(e)=> setValue(e.target.value)} ></input> */}
            {/* <button className="btn btn-primary" >Envoyer</button> */}
        </div>
    </div>
    );
}