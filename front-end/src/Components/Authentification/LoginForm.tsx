import "../../styles/Components/Authentification/LoginForm.css"
import React from "react";
import { getSession, signIn, useSession } from 'next-auth/react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default function AuthForm() {
  
   const handleFourtyTwo = async (e: React.MouseEvent<HTMLButtonElement>) => {
		
  e.preventDefault()
  const {hostname, port} = document.location;
   let request = await fetch('http://localhost:4000/auth/authorize', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({redirect_uri: `http://${hostname}:${port}`})
		});
    let response = await request.json();
		document.location.href = response.url;
  }
  return (
    <>
          <form className="auth-form">
          <h1>Master Pong</h1>
              <input placeholder="Email"></input>
              <input placeholder="Password"></input>
              <button className="btn btn-primary"> Login </button>
              <hr></hr>
              <p>or</p>
              <button className="btn btn-secondary"> Register </button>
              <p>Sign with</p>
              <div className="sign">
                <button onClick={handleFourtyTwo} 
                    className="logo42">
                </button>
              </div>
              
          </form>
      
    </>
  )
}