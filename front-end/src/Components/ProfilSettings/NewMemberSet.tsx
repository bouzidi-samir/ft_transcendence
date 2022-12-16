import "../../styles/Components/ProfilSettings/NewMemberSet.css"
import React, {useState } from 'react'
import NewMemberAvatar from "./NewMemberAvatar";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import {myIsalpha} from "../../Utils/Util";
import {useNavigate } from "react-router";

export default function NewMemberSet() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const dispatch = useDispatch();
    const[avatarform, setAvatarform] = useState(false);
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("");
    let navigation = useNavigate();
    
    function nickError(nickname: string) : boolean {
        if ((nickname.length == 0) ) {
            setError("Merci de choisir un pseudo.")
            return false;
        } else if ((nickname.length < 4 || nickname.length > 8) ) {
            setError("Ton pseudo doit contenir entre 4 et 8 charactères.")
            return false;
        } else if(!myIsalpha(nickname)){
            setError("Les trois premiers caracteres doivent etre des lettres.")
            return false;
        } else if (Userlist.some((e : any) => nickname == e.nickname)){
            setError("Ce pseudo est déja utilié.")
            return false;
        }
        return true;
    } 

    function handlechange(e: any) {
      setNickname(e.target.value);
    }

    async function handleForm (e : any) {
        e.preventDefault();
        if (nickError(nickname) == false)
            return;
        let userUpdate = {...User};
        userUpdate.nickname = nickname;
        let response = await fetch(`http://${hostname}:4000/users/${User.id}/nickname`,{
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${User.JWT_token}`,
                        "Content-Type": "application/json",
                        'cors': 'true',
                    },
                    body: JSON.stringify({nickname})
                }
                ).then(response => response.json())
                if (response.error) {
                    setError(response.error)
                    return;
                }
            dispatch({type: "User/setUser",payload: userUpdate,});
            setError("");
        return navigation("/Home");
    }

    return (
        <>
            <div  
                className="newform" data-aos="fade-up" data-aos-duration="1000" >
                <h1 >Master Pong</h1>
                <p>Choisis un pseudo et selectionne un avatar:</p>
                <img  className="vignette-form" src={User.avatar_url}></img>
                    {avatarform ? <NewMemberAvatar setAvatarform={setAvatarform} /> : null}
                <div onClick={()=> setAvatarform(true)} className='set-avatar'></div>               
                  <input type="text" onChange={handlechange}></input>             
                <p className="error-text">{error}</p>
                <button onClick={handleForm}  className="btn btn-primary valid">Valider</button>
            </div>
        </>
    );
}