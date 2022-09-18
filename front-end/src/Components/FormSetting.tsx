import "../styles/Components/FormSetting.css"
import React, { useContext, useState } from 'react'
import AvatarSetting from "./AvatarSetting";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function FormSetting(props:any) {
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const[avatarform, setAvatarform] = useState(false);
    const[nickForm, setNickform] = useState(false);
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
        <>
            {avatarform ? <AvatarSetting setAvatarform={setAvatarform} /> : null}
            <form className="form-setting" data-aos="fade-up" data-aos-duration="1000">
                <img  className="vignette-form" src={User.avatar_url}></img>
                <div onClick={()=> setAvatarform(true)} className='set-avatar'></div>
                    {!nickForm ? <h2>{User.nickname}</h2> 
                        : <input type="text" onChange={handlechange}></input>}
                <div onClick={()=> setNickform(true)}  className='set-nickname'></div>
                <button onClick={handleForm}  className="btn btn-primary">Valider</button>
            </form>
        </>
    );
}