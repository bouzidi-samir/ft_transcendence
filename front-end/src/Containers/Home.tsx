import "../styles/Containers/Home.css"
import React, { useState } from 'react'
import Navbar from "../Components/Share/Navbar"
import Dashboard from "../Components/Home/Dashboard"
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useEffect } from "react";
import { User } from "../Slices/UserSlice";
import { io, Socket } from "socket.io-client";
import mp3Sexy from '../styles/Sound/sexy.mp3';
import mp3 from '../styles/Sound/new.mp3';
import { Howl } from "howler";



export default function Home() {
  const User = useSelector((state: any) => state.User);
  const Roomlist = useSelector((state: any) => state.RoomList);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket>();
  const [alert, setAlert] = useState<string>("Pong");
  const values = Object.values(User.JWT_token);

  const playMp3 = (src: any) => {
    const sound = new Howl({
      src, 
      html5: true,
    });
    sound.play()
  };
  
  useEffect(() => {
      const newSocket = io('http://localhost:8000', {
      extraHeaders: {
        Authorization: `Bearer ${values[0]}`
      }
      });
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

  useEffect(() => {
    document.title = alert;
    if (alert != 'Pong'){
    //   if (User.username == "ochichep"){
    //     playMp3(mp3Sexy)
    //   }
    //   else{
      playMp3(mp3);
      }
      //   }
      setTimeout(function(){setAlert('Pong')}, 2000);
    })

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
