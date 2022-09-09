import "../styles/Containers/Accueil.css"
import React, {useState, useContext, useEffect,} from "react";
import Custom from "../Components/Custom";
import UserContext from "../Context/userContext";
import { useParams, Navigate, useNavigate } from "react-router";
import Home from "./Home";


export default function Accueil(props: any) {
   
    const {user, setUser} = useContext(UserContext); 
    const [custom, setCustom] = useState(false);
    const [newMenber, setNewMenber] = useState(true);
    let navigation = useNavigate();

    function redirection() {
        console.log(user);
        console.log(user.registred);

        if (user.registred === 'false')
        {
            setCustom(true);
            //navigation("/Profil");
        }
        else if (user.registred === 'true')
            navigation("/Home");
    }   
 
    return (
        <>
        <div className="custom-content">
           <div className="pong" data-aos="fade-up" data-aos-duration="2000"></div>
           {custom == false ?
                <div className="custom-title">
                    <h1  data-aos="fade-right" data-aos-duration="2200">Master Pong</h1>
                    <button  onClick={redirection}
                        data-aos="fade-left"  data-aos-duration="2200" 
                        className="btn btn-primary">
                        Commencer
                    </button>
                </div>
            : <Custom setCustom={setCustom}/>}
            <div className="pong" data-aos="fade-down" data-aos-duration="2000"></div>
        </div>
        </>
    )
}