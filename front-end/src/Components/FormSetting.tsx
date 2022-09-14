import "../styles/Components/FormSetting.css"
import React, { useContext, useState } from 'react'
import UserContext from "../Context/userContext";
import AvatarSetting from "./AvatarSetting";

export default function FormSetting() {
    const {user, setUser} = useContext(UserContext); 
    const[avatarform, setAvatarform] = useState(false);

    return (
        <>
            {avatarform ? <AvatarSetting setAvatarform={setAvatarform} /> : null}
            <form className="form-setting">
                <img  className="vignette-form" src={user.avatar_url}></img>
                <div onClick={()=> setAvatarform(true)} className='set-avatar'></div>
                <h2>{user.nickname}</h2>
                <button className="btn btn-primary">Valider</button>
            </form>
        </>
    );
}