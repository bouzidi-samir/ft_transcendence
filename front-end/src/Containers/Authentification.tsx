import "../styles/Containers/Authentification.css"
import LoginForm from "../Components/LoginForm"
import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default function Authentification() {

  function handleFourtyTwo() {
    //query pour l'auhtentification avec 42.
  }

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
