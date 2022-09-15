import "../styles/Components/FormSetting.css"
import React, { useContext, useState } from 'react'
import UserContext from "../Context/userContext";
import AvatarSetting from "./AvatarSetting";

export default function FormSetting() {
    const {user, setUser} = useContext(UserContext); 
    const[avatarform, setAvatarform] = useState(false);
    const[nickForm, setNickform] = useState(false);
    const [nickname, setNickname] = useState("");

    function handlechange(e: any) {
      setNickname(e.target.value);
    }

    async function handleForm () {
        let userUpdate = {...user};
        userUpdate.nickname = nickname;
        setUser(userUpdate);
    /*   let response = await fetch(
                `http://localhost:4000/users/${user.id}/nickname`,
                {
                    method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
                    body: JSON.stringify({nickname})
                }
            ).then(response => response.json());*/
      }

    return (
        <>
            {avatarform ? <AvatarSetting setAvatarform={setAvatarform} /> : null}
            <form className="form-setting">
                <img  className="vignette-form" src={user.avatar_url}></img>
                <div onClick={()=> setAvatarform(true)} className='set-avatar'></div>
                    {!nickForm ? <h2>{user.nickname}</h2> 
                        : <input type="text" onChange={handlechange}></input>}
                <div onClick={()=> setNickform(true)}  className='set-nickname'></div>
                <button onClick={handleForm}  className="btn btn-primary">Valider</button>
            </form>
        </>
    );
}