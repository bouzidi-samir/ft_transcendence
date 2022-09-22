import "../styles/Containers/Chat.css";
import Navbar from "../Components/Share/Navbar";
import Rooms from "../Components/Chat/Rooms";
import Messages from "../Components/Chat/Messages";
import UserChat from "../Components/Chat/UserChat";
import { useState, useEffect } from "react";
import { io, Socket } from 'socket.io-client';

export default function Chat() {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);

    const send = (messageData: any) => {

      // socket?.emit("message", messageData.author + '  (' + messageData.time + ')' + "\n" + messageData.message)
      socket?.emit("message", messageData.name, messageData.time, messageData.text)
    }

    useEffect(() => {
      const newSocket = io('http://localhost:8000')
      setSocket(newSocket)
      // console.log(socket?.id)
    }, [setSocket])

    const messageListener = (messageData: any) => {
      setMessages([...messages, messageData])   
    }

    useEffect(() => {
      socket?.on("message" , messageListener)
      return () => {
          socket?.off("message", messageListener)
      }
    }, [messageListener])
    
    return (
      <>
        <Navbar/> 
        <div className="chat-content">
            <Rooms/>
            <Messages  messages={messages}/>
            <UserChat/>
        </div>
      </>
    )
  }