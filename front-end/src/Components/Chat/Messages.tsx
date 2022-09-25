import '../../styles/Components/Chat/Messages.css'
import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function Messages() {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);
    const [value, setValue] = useState<string>("");

    const send = (messageData: any) => {
      socket?.emit("message", messageData.name, messageData.time, messageData.text)
    }

    useEffect(() => {
      const newSocket = io('http://localhost:8000')
      setSocket(newSocket)
    }, [setSocket])
    
    const messageListener = (message: string) => {
        setMessages([...messages, message]);
    }
    
    useEffect(() => {
       return () => {
            socket?.off("message", messageListener)
       }
      }, [messageListener])

    return (
        <div className="messages-content">
            <div className='room-title'>
                <h2>Nom de la room</h2>
            </div>
            <div className="conversation">
                console.log(message);
            {messages.map((message: string, index: number) => (   
                    <div key={index}>    
                         <div>{message}</div>
                    </div>
                ))}
            </div>
            <div className="send-zone">
            <input value={value} onChange={(e)=> setValue(e.target.value)} ></input>
            <button onClick={() => send(value)}className="btn btn-primary" >Envoyer</button>
        </div>
    </div>
    );
}