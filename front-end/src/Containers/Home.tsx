import "../styles/Containers/Home.css"
import React from 'react'
import Navbar from "../Components/Share/Navbar"
import Dashboard from "../Components/Home/Dashboard"
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useEffect } from "react";
import { User } from "../Slices/UserSlice";

export default function Home() {
  const User = useSelector((state: any) => state.User);
  const Roomlist = useSelector((state: any) => state.RoomList);
  const dispatch = useDispatch();

<<<<<<< HEAD
  console.log('User.JWT',User.JWT_token);
  const values = Object.values(User.JWT_token);
  console.log('values', values);

=======
>>>>>>> merge_SO
  useEffect(() => {
    let url = "http://localhost:4000/chat/createGlobalRoom";
    const response = fetch(url, {
      method: "POST",
      headers: {
<<<<<<< HEAD
        'Authorization': `Bearer ${values[0]}`,
=======
>>>>>>> merge_SO
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
