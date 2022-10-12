import "../styles/Containers/Home.css"
import React, { useState } from 'react'
import Navbar from "../Components/Share/Navbar"
import Dashboard from "../Components/Home/Dashboard"
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useEffect } from "react";
import { User } from "../Slices/UserSlice";
import { io, Socket } from "socket.io-client";



export default function Home() {
  const User = useSelector((state: any) => state.User);
  const Roomlist = useSelector((state: any) => state.RoomList);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket>();
  const [alert, setAlert] = useState<string>("Pong");
  

  function useTitle(title: any) {
    useEffect(() => {
      document.title = title
      return () => {
        document.title = title;
      }
    })
  }
  
  const values = Object.values(User.JWT_token);

  useEffect(() => {
      const newSocket = io('http://localhost:8000');
      setSocket(newSocket)
  }, [setSocket])

  const alertListener = (alert: string) => {
      setAlert(alert);
  }

  useEffect(() => {
      socket?.on("newMessageServer", alertListener);
      return () => {
          socket?.off("newMessageServer", alertListener)
      }
  }, [alertListener])

  useTitle(alert);

  useEffect(() => {
    let url = "http://localhost:4000/chat/createGlobalRoom";
    const response = fetch(url, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${values[0]}`,
        'Content-Type': 'application/json',
        'cors': 'true'
      },
    }
    );
  }, []
  )
  
  return (
    <>
      <Navbar/>
      <Dashboard/> 
    </>
  )
}
