import "../styles/Containers/Home.css"
import React from 'react'
import {BrowserRouter as Router, Route, Link, useSearchParams} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react'
import Navbar from "../Components/Navbar"
import Dashboard from "../Components/Dashboard"
import UserContext from "../Context/userProfilContext";

export default function Home() {

  const user = useContext(UserContext);
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Navbar/>
      <Dashboard/> 
    </>
  )
}
