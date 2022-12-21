import "../styles/Containers/Authentification.css"
import LoginForm from "../Components/Authentification/LoginForm"
import React from "react";
import { useEffect, useState} from 'react';
import {useSearchParams, Navigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Particle from "../Components/Particle";
import localStorage from "redux-persist/es/storage";


export default function Authentification() {
  const User = useSelector((state: any) => state.User);
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [fortyTwo, setFortyTwo] = useState(false);
  
  useEffect(() => {
    const code = params.get("code")
		const {hostname, port} = document.location;
    if (code)
		{
      setFortyTwo(true);
			fetch(`http://${hostname}:4000/auth/token/${code}`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json','cors': 'true', 'Authorization': `Bearer ${User.JWT_token}` },
				body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
			})
			.then(response => response.json())
      .then((response) => {dispatch({type: "User/setUser", payload: response,});})

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
