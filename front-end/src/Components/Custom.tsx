import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Components/Custom.css"
import UserContext from '../Context/userProfilContext'

export default function Custom(props: any) {
  const user = useContext(UserContext);
  return (
    <div className="custom-form" data-aos="fade-up" data-aos-duration="1000">
            <img  className="vignette" src={user.avatar_url}></img>
        <form >
            <h2>Bienvenue {user.username}</h2>
            <h3>Choisie ton pseudo:</h3>
            <input></input>
            <Link to={"/Home"}>
              <button className="btn btn-primary">Valider</button>
            </Link>
        </form>
    </div>
  )
}
