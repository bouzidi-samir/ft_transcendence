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

  useEffect(() => {
    let url = "http://localhost:4000/chat/member";
    const ret = fetch(url)
    .then(response => response.json())
    .then(data => 
      dispatch({
        type: "User/setRooms",
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