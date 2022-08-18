import "./Authentification.css"
import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default function Authentification() {

  function handleFourtyTwo() {
    //query pour l'auhtentification avec 42.
  }

  return (
    <div className="auth-content">
        <div className="auth-field">
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
                <button onClick={handleFourtyTwo} className="logo42">
                </button>
              </div>
              
          </form>
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
