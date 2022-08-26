import "../styles/Components/LoginForm.css"
import React from "react";
import { getSession, signIn, useSession } from 'next-auth/react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default function AuthForm() {

   const {data: session} = useSession();
   
    async function handleFourtyTwo() {
      signIn('github', {callbackUrl: 'http://localhost:3000/Home'});
      console.log(session);
        //const response =  await signIn('42-school', {
        //callbackUrl: "http://localhost:3000",
      //})
    
       // )
      
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