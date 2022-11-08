import "../../styles/Components/ProfilSettings/NewMemberSet.css"
import React, { useContext, useEffect, useState } from 'react'
import AvatarSetting from "./AvatarSetting";
import Cross from "../Share/Cross";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';
import {myIsalpha} from "../../Utils/Util";
import { useParams, Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { responsePathAsArray } from "graphql";
import NewMemberSet from "./NewMemberSet";

export default function TFAset() {
    
    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const dispatch = useDispatch();
    const[avatarform, setAvatarform] = useState(false);
    const[nickForm, setNickform] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [validated, setValidation] = useState(false);
    let navigation = useNavigate();

    function validateResponse(response : any) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    async function checkCode() : Promise<any>
    {
        let ret;
        const request = await fetch(`http://localhost:4000/2fa/authenticate`, { // A remplacer avec le user
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${User.JWT_token['access_token']}`
            },
            body: JSON.stringify({userId : User.id, code : code })
        })
        ret = await request.json();
        return (ret);
    }
    
    useEffect( () => {
    }, []
    )

    async function codeError(code: string) {
        if ((code.length == 0) ) {
            setError("Un code ne peut pas être vide.");
            return false;
        }
        let ret = await checkCode();
        if (ret.codeValidity == false)
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
        setValidation(true);
    }

    return (
        <>  
            {avatarform ? <AvatarSetting setAvatarform={setAvatarform} /> : null}
            {validated === false &&
                <><h1>Bienvenue! Rentre tes informations.</h1><form className="form-newsetting" data-aos="fade-up" data-aos-duration="1000">
                    <input type="text" style={{marginTop: "200px"}} onChange={handlechange}></input>
                    <button onClick={handleForm}className="btn btn-primary">Envoyer mon code qrcode</button>
                    <p className="error-text">{error}</p>
                </form></>
            }
            {validated === true &&
            
                <NewMemberSet />
            }
        </>
    );
}