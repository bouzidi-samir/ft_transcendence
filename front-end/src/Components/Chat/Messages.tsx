import '../../styles/Components/Chat/Messages.css'
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { io, Socket } from 'socket.io-client';
import MessageInput from './MessageInput';

export default function Messages() {
    const [socket, setSocket] = useState<Socket>();
    // const [messages, setMessages] = useState<{name: any, time: string, text: string}[]>([]);
    const [messages, setMessages] = useState<string[]>([]);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const User = useSelector((state: any) => state.User);

    // type mData = {
    //     name: string,
    //     time: string,
    //     text: string,
    //   };
    
    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        console.log('New socket', newSocket?.id);
        setSocket(newSocket)
    }, [setSocket])
    
    const send = (message: any) => {
    //   socket?.emit("messageFromClient", messageData.name, ' ', messageData.time, ' ', '"', messageData.text, '"')
      socket?.emit("messageFromClient", {message})
    }

    const messageListener = (message: any) => {
        const obj = JSON.parse(JSON.stringify(message));
        console.log('obj', obj);
        console.log('obj.text', obj.message.text);
        setMessages([...messages, obj.message.text]);
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
                    {/* <span>{message.name}</span>   */}
                    {/* <span>{message.time}</span>   */}
                         <div>" {message} "</div>
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