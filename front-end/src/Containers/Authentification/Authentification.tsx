import "./Authentification.css"
import React from "react";


export default function Authentification() {
  return (
    <div className="auth-content">
        <div className="auth-field">
          <form className="auth-form">
          <h1>Master Pong</h1>
              <input></input>
              <input></input>
              <button className="btn btn-primary"> Login </button>
              <hr></hr>
              <p>or</p>
              <button className="btn btn-secondary"> Register </button>
              <p>Sign with</p>
              
                <a href="https://api.intra.42.fr/oauth/authorize?client_id=6e52620f16bfa38095e26eae2231051c3fff5161197180b12228a4a2e04bbdb1&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code"> 
                
                <div className="logo42"></div>
                </a>
              
          </form>
        </div>
        
        <div className="picture">
        
        </div>


    </div>
  )
}
