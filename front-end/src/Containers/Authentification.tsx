import "../styles/Containers/Authentification.css"
import LoginForm from "../Components/Authentification/LoginForm"
import React from "react";
import { useEffect, useState} from 'react';
import {useSearchParams, Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import Particle from "../Components/Particle";
import ProfilSettings from "./ProfilSettings";
import FormSetting from "../Components/ProfilSettings/FormSetting";
import NewMemberSet from "../Components/ProfilSettings/NewMemberSet";
import Home from "./Home";

export default function Authentification() {
  
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [fortyTwo, setFortyTwo] = useState(false);
  const User = useSelector((state: any) => state.User);
  
  useEffect(() => {
    const code = params.get("code")
		const {hostname, port} = document.location;
    if (code)
		{
      setFortyTwo(true);
			const request = fetch(`http://${hostname}:4000/auth/token/${code}`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json','cors': 'true'},
				body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
			})
			.then(response => response.json()
      .then((response) => {dispatch({type: "User/setUser", payload: response,});}))
			request.catch(e => {console.error(e)})
		}
		return () => {}
  }, [])

  return (
    <div className="auth-content">
       <div className="auth-field">
            <Particle/>   
          {!fortyTwo ? <LoginForm/> : <Navigate to={"/Loading"}/>}
        </div>        
    </div>
  )
}
