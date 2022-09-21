import "../styles/Containers/Authentification.css"
import LoginForm from "../Components/LoginForm"
import React from "react";
import { useEffect, useState, useContext} from 'react';
import Particle from "../Components/Particle";
import {BrowserRouter as Router, Route, Link, useSearchParams, Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function Authentification() {
  
  const User = useSelector((state: any) => state.User);
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [resgistred, setRegistred] = useState(false);
  const [username, setUsername] = useState(""); 
  

  useEffect(() => {
    const code = params.get("code")
		const {hostname, port} = document.location
		
    if (code)
		{
      setLoading(true)
			const request = fetch(`http://localhost:4000/auth/token/${code}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'cors': 'true'
				},
				body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
			})
			request.then(response => response.json()
      .then((response) => {
        dispatch({
          type: "User/setUser",
          payload: response,
        });
        setUsername(response.username);
        setRegistred(true);
			}))
			request.catch(e => {console.error(e)})
		}
		return () => {}
  }, [])
  if (resgistred){
    return  <Navigate to={"/Accueil"}/>;
  }
  return (
    <div className="auth-content">
       <div className="auth-field">
       
            <LoginForm/>
         
        </div>        


    </div>
  )
}
