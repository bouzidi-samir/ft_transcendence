import "../../styles/Components/ProfilSettings/NewMemberSet.css"
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import {useNavigate } from "react-router";

export default function TFAset() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [validated, setValidation] = useState(false);
    let navigation = useNavigate();

    async function checkCode() : Promise<any>
    {
        let ret;
        const request = await fetch(`http://${hostname}:4000/2fa/authenticate`, { // A remplacer avec le user
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${User.JWT_token}`
            },
            body: JSON.stringify({userId : User.id, code : code })
        })
        ret = await request.json();
        return (ret);
    }
    
    async function codeError(code: string) {
        if ((code.length === 0) ) {
            setError("Un code ne peut pas être vide.");
            return false;
        }
        let ret = await checkCode();
        if (ret.codeValidity === false)
        {
            setError("Le code envoyé n est pas bon.");
            return false;
        }
        let userUpdate = {...User};
        userUpdate.JWT_token = ret.JWT_token;
        dispatch({type: "User/setUser", payload: userUpdate,});
        return ret.codeValidity;
    } 

    function handlechange(e: any) {
        setCode(e.target.value);
    }

    async function handleForm (e : any) {
       e.preventDefault();
        if (await codeError(code) == false)
            return;
        setError("");
        navigation("/Home")
    }

    return (
        <>  
            {validated === false &&
                <form className="qr-form" data-aos="fade-up" data-aos-duration="1000">
                    <div className="qr-icone"></div>
                    <p className="p-qr">Bienvenue {User.nickname}.</p>
                    <p className="p-qr"> Merci de saisir ton code d'authentification:</p>
                    <input className="qr-input" type="text"  onChange={handlechange}></input>
                    <button onClick={handleForm}className="btn btn-primary">Envoyer</button>
                    <p className="error-text">{error}</p>
                </form>
            }
        </>
    );
}