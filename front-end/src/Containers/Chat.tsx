import "../styles/Containers/Chat.css";
import Navbar from "../Components/Share/Navbar";
import Rooms from "../Components/Chat/Rooms";
import Messages from "../Components/Chat/Messages";
import UserChat from "../Components/Chat/UserChat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';


export default function Chat() {
  const Roomlist = useSelector((state: any) => state.RoomList);
  const dispatch = useDispatch();
<<<<<<< HEAD
=======
  useEffect(() => {
    let url = "http://localhost:4000/chat/createGlobalRoom";
    const response = fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'cors': 'true'
      },
    }
    );
  }, []
  )
>>>>>>> 962a0f5478f19803f435cbb485fc5202e3263d44

  useEffect(() => {
    let url = "http://localhost:4000/chat/rooms";
    const ret = fetch(url)
    .then(response => response.json())
    .then(data => 
      dispatch({
        type: "Roomlist/setRoomlist",
        payload: data,
      }
      )
    );
  }, []
  )

    return (
      <>
        <Navbar/> 
        <div className="chat-content">
            <Rooms/>
            <Messages/>
            <UserChat/>
        </div>
      </>
    )
  }