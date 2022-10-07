import '../../styles/Components/Chat/Messages.css'
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { io, Socket } from 'socket.io-client';
import MessageInput from './MessageInput';

export class Message {
    constructor(sender: string, time: string, message: string, roomTag: string) {
        this.sender = sender;
        this.time = time;
        this.message = message;
        this.roomTag = roomTag
    }
    sender: string;
    time: string;
    message: string;
    roomTag: string
}

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
    
    const send = (messageData: any, roomTag : string) => {
      socket?.emit("messageFromClient", messageData.name, ' ', messageData.time, ' ', messageData.text)
    //   socket?.emit("messageFromClient", { messageData })
    }

    const messageListener = (message: any) => {
        let tab = [...message];
        console.log(tab);
        let newMessage = new Message(tab[0], tab[2], tab[4], RoomActive.tag);
        setMessages([...messages, newMessage]);
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
            {messages.map((message: any, index: number) => (   
                message.sender == User.nickname ? 
                    <div key={index} className="buble" >
                        <img src={User.avatar_url} className="avatar-buble"></img>   
                    <div key={index} className="message-bubleA"> 
                        <p>{message.sender}:</p>
                         <p>{message.message}</p>
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
