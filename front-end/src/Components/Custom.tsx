import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Components/Custom.css"
import UserContext from '../Context/userContext'

export default function Custom(props: any) {
  const {user, setUser} = useContext(UserContext); 
  const [nickname, setNickname] = useState("");

  function handlechange(e: any) {
    setNickname(e.target.value);
  }

  async function handleForm () {
    let userUpdate = {...user};
    userUpdate.nickname = nickname;
    setUser(userUpdate);
   let response = await fetch(
			`http://localhost:4000/users/${user.id}/nickname`,
			{
				method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
				body: JSON.stringify({nickname})
			}
		).then(response => response.json());
  }

  return (
    <div className="custom-form" data-aos="fade-up" data-aos-duration="1000">
            <img  className="vignette" src={user.avatar_url}></img>
        <form >
            <h2>Bienvenue {user.username}</h2>
            <h3>Choisis ton pseudo:</h3>
            <input onChange={handlechange} value={nickname}></input>
            <Link to={"/Home"}>
              <button onClick={handleForm} className="btn btn-primary">Valider</button>
            </Link>
        </form>
    </div>
  )
}
