import "../styles/Containers/Home.css"
import React from 'react'
import {BrowserRouter as Router, Route, Link, useSearchParams} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import Navbar from "../Components/Share/Navbar"
import Dashboard from "../Components/Home/Dashboard"

export default function Home() {
  
  const [params] = useSearchParams();
 
  return (
    <>
      <Navbar/>
      <Dashboard/> 
    </>
  )
}
