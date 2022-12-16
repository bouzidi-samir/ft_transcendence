import "../styles/Containers/Home.css"
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import Navbar from "../Components/Share/Navbar"
import Dashboard from "../Components/Home/Dashboard"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { User } from "../Slices/UserSlice";
import mp3 from '../styles/Sound/new.mp3';
import { Howl } from "howler";



export default function Home() {
  const {hostname} = document.location;
  let navigation = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state: any) => state.User);
  const [socket, setSocket] = useState<Socket>();
  const [alert, setAlert] = useState<string>("Pong");

  const playMp3 = (src: any) => {
    const sound = new Howl({src, html5: true,});
    sound.play()
  };

  useEffect(() => {
      const newSocket = io(`http://${hostname}:8000`);
      setSocket(newSocket)
  }, [setSocket])

  const alertListener = (alert: string) => {
    setAlert(alert);
  }
  
  useEffect(() => {
      socket?.on("newMessageServer", alertListener);
      return () => {socket?.off("newMessageServer", alertListener)}
  }, [alertListener])


  useEffect(() => {
    document.title = alert;
    if (alert !== 'Pong'){
      playMp3(mp3);
      setTimeout(function(){setAlert('Pong')}, 2000);
    }
  })

  useEffect(() => {
    let url = `http://${hostname}:4000/chat/createGlobalRoom`;
   fetch(url, {method: "POST",
      headers: {
        'Authorization': `Bearer ${User.JWT_token}`,
        'Content-Type': 'application/json',
        'cors': 'true'
      },
    }
    )
    .then(ret => {
      if(ret.status === 401)
        navigation("/Unauthorized");
    })
    ;

    let url_ = `http://${hostname}:4000/chat/setOnline`;
        fetch(url_, {method: "POST",
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username: User.username,
            })
        }
        )
  }, [User]
  ) 
  
  return (
    <>
      <Navbar/>
      <Dashboard/> 
    </>
  )
}
