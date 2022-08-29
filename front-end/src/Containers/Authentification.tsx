import "../styles/Containers/Authentification.css"
import LoginForm from "../Components/LoginForm"
import React from "react";
import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link, useSearchParams} from 'react-router-dom';
import { getSession, signIn, useSession, SessionProvider } from 'next-auth/react'


export default function Authentification() {
  
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const code = params.get("code")
		const {hostname, port} = document.location
		if (code)
		{
			console.log(code);
      //setLoading(true)
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
        console.log(response);
			}))
			request.catch(e => {console.error(e)})
		}
		return () => {}
  }, [])
  return (
    <div className="auth-content">
        <div className="auth-field">
     
            <LoginForm/>
         
        </div>        
        <div className="picture">
          <Link  to={'/Accueil'}>
            <button className="btn btn-warning demo">
              Demo
            </button>
          </Link>
        </div>

    </div>
  )
}
