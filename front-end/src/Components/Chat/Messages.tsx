import '../../styles/Components/Chat/Messages.css'
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { io, Socket } from 'socket.io-client';
import MessageInput from './MessageInput';
import RoomDisplay from './RoomDisplay';
import Conversation from './Conversation';


export default function Messages() {
   const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<any[]>([]);
    const [value, setValue] = useState<string>("");
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const User = useSelector((state: any) => state.User);
    const Roomlist = useSelector((state: any) => state.RoomList);
    const dispatch = useDispatch();
    

    const alert = "NEW MESSAGE AVAILABLE";
    const  alertNotif = {
        text: "New message",
        from: String(User.nickname),
        room: String(RoomActive.tag)
    }

    async function updateRoomList() {
        let url = `http://localhost:4000/chat/rooms`;
        let response = await fetch(url).then(ret => ret.json()) 
        dispatch({type: "Roomlist/setRoomlist",payload: response,})
    }

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket)
    }, [setSocket])
    
    // Récupération des messages de la room active.
    useEffect(() => {
        let url : string = `http://localhost:4000/chat/getRoomMessages/${RoomActive.tag}`;
        const ret = fetch(url)
        .then(response => response.json())
        .then(data => setMessages(data))
    }, [RoomActive])

    const send = (messageData: any) => {
        socket?.emit("messageFromClient", { messageData });
         if (Roomlist.some((e : any) => RoomActive.tag == e.tag)){
          socket?.emit("newMessageClient", alert )}
        socket?.emit("newNotifClient", { alertNotif });
    }

    const messageListener = (message: any) => {
        let MessagesList : any[] = [];
        if (messages.length > 0)
            MessagesList = [...messages];
        if (message.messageData.room == RoomActive.tag) {
            MessagesList.push(message.messageData);
            setMessages(MessagesList);
        }
        updateRoomList();
    }
    
    useEffect(() => {
        socket?.on("messageFromServer" , messageListener)
        return () => {
            socket?.off("messageFromServer", messageListener)
        }
    }, [messageListener])

    return (
        <div className="messages-content">
            <RoomDisplay/>
            <Conversation messages={messages} />
            <MessageInput send={send}/>
        </div>
    );
}
