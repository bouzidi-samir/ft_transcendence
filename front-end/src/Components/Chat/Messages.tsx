import '../../styles/Components/Chat/Messages.css'
import React, {useContext, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { io, Socket } from 'socket.io-client';
import MessageInput from './MessageInput';
import RoomDisplay from './RoomDisplay';
import Conversation from './Conversation';
import { useNavigate } from 'react-router';
import { SocketContext } from '../../Context/socket';


export default function Messages() {
    const {hostname} = document.location;
    // const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<any[]>([]);
    const RoomActive = useSelector((state: any) => state.RoomActive);
    const User = useSelector((state: any) => state.User);
    const Roomlist = useSelector((state: any) => state.RoomList);
    const dispatch = useDispatch();
    const [blockedList, setBlockedList] = useState([]);
    let tab = Array();
    let navigation = useNavigate();

    

    const alert = "NEW MESSAGE AVAILABLE";
    const  alertNotif = {
        text: "New message",
        from: String(User.nickname),
        room: String(RoomActive.tag)
    }
    const socket = useContext(SocketContext);

    useEffect(() => {
        let url = `http://${hostname}:4000/users/blockedPeople/${User.username}`;
        fetch(url, {headers: 
            {'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },})
        .then((ret) => { 
            if (ret.status === 401)
            navigation("/Unauthorized");
            else
                return ret.json()})
        .then((data) => {
        if (data != undefined){
        let list : any  = data;
        list.map((e: any) => (e.toUsername));
        setBlockedList(list)
        }
        })
    },[])




    // async function updateRoomList() {
    //     let url = `http://${hostname}:4000/chat/rooms`;
    //     let response = await fetch(url, { headers: {
    //         'Authorization': `Bearer ${User.JWT_token}`,
    //         "Content-Type": "application/json",
    //         'cors': 'true'
    //     }})
    //     .then(ret => ret.json()) 
    //     dispatch({type: "Roomlist/setRoomlist",payload: response,})

    // }


    // useEffect(() => {
    //     const newSocket = io(`http://${hostname}:8000`);
    //     setSocket(newSocket)
    // }, [setSocket])
    
    useEffect(() => {
        let url : string = `http://${hostname}:4000/chat/getRoomMessages/${RoomActive.tag}`;
        const ret = fetch(url, { headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            "Content-Type": "application/json",
            'cors': 'true'
        }})
        .then((response) => {
            if(response.status === 401)
              navigation("/Unauthorized");
            else
                return response.json()})
            .then((data) => 
            {
                if (data != undefined){
                tab = data;
                let sort = tab.filter((e: any) => !blockedList.some((blockedName : string) => blockedName == e.fromUsername));
                setMessages(sort)}
            }
        );
        // .then(response => response.json())
        // .then((data) => 
        // {
        //     tab = data;
        //     let sort = tab.filter((e: any) => !blockedList.some((blockedName : string) => blockedName == e.fromUsername));
        //     setMessages(sort)}
        // )
    }, [RoomActive])

    const send = (messageData: any) => {
        socket?.emit("messageFromClient", { messageData });
         if (Roomlist.some((e : any) => RoomActive.tag == e.tag)){
          socket?.emit("newMessageClient", alert )}
        //socket?.emit("newNotifClient", { alertNotif });
    }

    const messageListener = (message: any) => {
        let MessagesList : any[] = [];
        if (messages.length > 0)
            MessagesList = [...messages];
        if (message.messageData.room == RoomActive.tag) {
            MessagesList.push(message.messageData);
            setMessages(MessagesList);
        }
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
