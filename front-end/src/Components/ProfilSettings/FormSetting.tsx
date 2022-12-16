import "../../styles/Components/ProfilSettings/FormSetting.css"
import React, {useState } from 'react'
import AvatarSetting from "./AvatarSetting";
import Cross from "../Share/Cross";
import TfaButton from "./TfaButton";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import {myIsalpha} from "../../Utils/Util";
import { useNavigate } from "react-router-dom";

export default function FormSetting() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const dispatch = useDispatch();
    const[avatarform, setAvatarform] = useState(false);
    const[nickForm, setNickform] = useState(false);
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("");
    let navigation = useNavigate();
  
    function nickError(nickname: string) : boolean {
        if ((nickname.length < 4 || nickname.length > 8) && nickForm === true) {
            setError("Ton pseudo doit contenir entre 4 et 8 charactères.")
            return false;
        } else if(!myIsalpha(nickname) && nickForm === true){
            setError("Les trois premiers caracteres doivent etre des lettres.")
            return false;
        } else if (Userlist.some((e : any) => nickname === e.nickname) && nickForm === true){
            setError("Ce pseudo  est déja utilié.")
            return false;
        }
        return true;
    } 

    function handlechange(e: any) {setNickname(e.target.value);}

    async function handleForm (e : any) {
        
        e.preventDefault();

        if (nickError(nickname) === false)
            return;
        if (!nickForm)
            return navigation("/Home");
        let userUpdate = {...User};
        userUpdate.nickname = nickname;
        let response = await fetch(`http://${hostname}:4000/users/${User.id}/nickname`,
        {method: "POST", headers: 
        { 'Authorization': `Bearer ${User.JWT_token}`,
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
            <div className="form-setting" data-aos="fade-up" data-aos-duration="1000" >
                <Cross lastPage="/Home" />
                <img  className="vignette-form" src={User.avatar_url}>         
                </img>
            {avatarform ? <AvatarSetting setAvatarform={setAvatarform} /> : null}
                <div onClick={()=> setAvatarform(true)} className='set-avatar'></div>
               
                    {!nickForm ? <h2>{User.nickname}</h2> 
                        : <input type="text" onChange={handlechange}></input>}

                <TfaButton/>
                <div onClick={()=> setNickform(true)}  className='set-nickname'></div>
        
                <button onClick={handleForm}  className="btn btn-primary">Valider</button>
                <p className="error-text">{error}</p>
            </div>
        </>
    );
}