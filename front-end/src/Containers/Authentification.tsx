import "../styles/Containers/Authentification.css"
import LoginForm from "../Components/Authentification/LoginForm"
import React from "react";
import { useEffect, useState} from 'react';
import {useSearchParams, Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function Authentification() {
  
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [resgistred, setRegistred] = useState(false);
  
  useEffect(() => {
    const code = params.get("code")
		const {hostname, port} = document.location;
    if (code)
		{
			const request = fetch(`http://${hostname}:4000/auth/token/${code}`, {
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
