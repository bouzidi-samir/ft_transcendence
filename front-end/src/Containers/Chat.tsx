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
    let url = "http://localhost:4000/chat/createGlobalRoom";
    const response = fetch(url, {
      method: "POST",
      headers: {
        'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1NlY29uZEZhY3RvckF1dGhlbnRpY2F0ZWQiOmZhbHNlLCJzdWIiOjEsImlhdCI6MTY2NDUzMDc3NCwiZXhwIjoxNjY0NjE3MTc0fQ.ywuIG2F9r_ZLyzEcIYKM7RkgMeMDwKD2LY66PDOq-_c`,
        'Content-Type': 'application/json',
        'cors': 'true'
      },
    }
    );
  }, []
  )

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