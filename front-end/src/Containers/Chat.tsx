import "../styles/Containers/Chat.css";
import Navbar from "../Components/Share/Navbar";
import Rooms from "../Components/Chat/Rooms";
import Messages from "../Components/Chat/Messages";
import UserChat from "../Components/Chat/UserChat";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const {hostname} = document.location;
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state.User);
  let navigation = useNavigate();
  const [alert] = useState<string>("Pong");
  
  function useTitle(title: any) {
    useEffect(() => {
      document.title = title
      return () => {
        document.title = title;
      }
    })
  }

  useTitle(alert);
  

  useEffect(() => {
    let url = `http://${hostname}:4000/chat/rooms`;
   fetch(url, {headers: 
      {'Authorization': `Bearer ${User.JWT_token}`,
      'Content-Type': 'application/json',
      'cors': 'true'
    },})
    .then((response) => {
      // console.log(response.status)
      if(response.status === 401)
        navigation("/Unauthorized");
      else
       return response.json()})
    .then((data) => {
      if (data !== undefined)
        dispatch({type: "Roomlist/setRoomlist",payload: data,});
    });
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