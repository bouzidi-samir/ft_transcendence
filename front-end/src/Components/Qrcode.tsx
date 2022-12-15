import { redirect } from "react-router"
import { useEffect, useState } from "react";
import Particle from "./Particle";
import Home from "../Containers/Home";
import { useParams, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Components/Share/MatchingPage.css"
import NewMemberSet from "./ProfilSettings/NewMemberSet";
import TFAset from './ProfilSettings/TFAset';
import Navbar from './Share/Navbar';

export default function CodePage (props : any) {
    const {hostname} = document.location;
    const {redirection} = props;
    const User = useSelector((state: any) => state.User);
    const [time , setTime] = useState(0);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser]  = useState(User);

    async function getQRcode()
    {
        const response = await fetch(`http://${hostname}:4000/2fa/generate`, { // A remplacer avec le user
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${User.JWT_token}`
        },
        
        body: JSON.stringify({userId : User.id }),
        })
        const blob = await response.blob();
        const url = await URL.createObjectURL(blob);
        let userUpdate = {...User};
        userUpdate.qrcode = url;
        dispatch({type: "User/setUser", payload: userUpdate,});
    }


    useEffect( () => {
        getQRcode();
     }, []
     )

    function redirect() {
       setTimeout(() => {
            navigation("/Home");
        }, 1000);
    }

    return (
        <>
            <Navbar />
        <div className="loading-content">
            <form className = 'form-newsetting'>
            <img style={{marginTop: "100px"}}className="vignette-form" src={User.qrcode}></img>
            <p className="p-qr">Scane ce QR Code pour récupérer ton code.</p>
            <p className="p-qr">Ce dernier te sera demandé lors de ta prochaine connection.</p>
            <p className="p-qr">Deconnecte toi pour reavoir acces aux services.</p>
            </form>

                
        </div>
        </>
    )
}