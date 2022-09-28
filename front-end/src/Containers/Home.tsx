import "../styles/Containers/Home.css"
import React from 'react'
import Navbar from "../Components/Share/Navbar"
import Dashboard from "../Components/Home/Dashboard"
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import { useEffect } from "react";

export default function Home() {
  const Roomlist = useSelector((state: any) => state.RoomList);
  const dispatch = useDispatch();
  

  return (
    <>
      <Navbar/>
      <Dashboard/> 
    </>
  )
}
