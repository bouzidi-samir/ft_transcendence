import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Components/Custom.css";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function Custom(props: any) {
  const User = useSelector((state: any) => state.User);
  const dispatch = useDispatch(); 
  const [nickname, setNickname] = useState("");

  function handlechange(e: any) {
    setNickname(e.target.value);
  }

  async function handleForm () {
    let userUpdate = {...User};
    userUpdate.nickname = nickname;
    dispatch({
      type: "User/setUser",
      payload: userUpdate,
    });
    let response = await fetch(
			`http://localhost:4000/users/${User.id}/nickname`,
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
            <img  className="vignette" src={User.avatar_url}></img>
        <form >
            <h2>Bienvenue {User.username}</h2>
            <h3>Choisis ton pseudo:</h3>
            <input onChange={handlechange} value={nickname}></input>
            <Link to={"/Home"}>
              <button onClick={handleForm} className="btn btn-primary">Valider</button>
            </Link>
        </form>
    </div>
  )
}
