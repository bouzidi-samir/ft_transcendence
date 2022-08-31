import "../styles/Containers/Authentification.css"
import LoginForm from "../Components/LoginForm"
import React from "react";
import { useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Link, useSearchParams, Navigate} from 'react-router-dom';


export default function Authentification() {
  
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
        setUsername(response.username);
        setRegistred(true);
			}))
			request.catch(e => {console.error(e)})
		}
		return () => {}
  }, [])
  if (resgistred){
    return  <Navigate to={"/Accueil/" + username}/>;
  }
  return (
    <div className="auth-content">
      
       <div className="auth-field">
     
            <LoginForm/>
         
        </div>        
        <div className="picture">
          <Link  to={'/Accueil/Demo'}>
            <button className="btn btn-warning demo">
              Demo
            </button>
          </Link>
        </div>

    </div>
  )
}
