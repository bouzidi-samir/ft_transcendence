import "../styles/Containers/Accueil.css"
import React, {useState, useContext, useEffect,} from "react";
import Custom from "../Components/Custom";
import { useParams, Navigate, useNavigate } from "react-router";
import Home from "./Home";
import Particle from "../Components/Particle";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function Accueil(props: any) {
    const User = useSelector((state: any) => state.User);
    const Userlist = useSelector((state: any) => state.UserList);
    const dispatch = useDispatch();
    const [custom, setCustom] = useState(false);
    const [newMenber, setNewMenber] = useState(true);
    let navigation = useNavigate();

    useEffect( () => {    
        let url : string = "http://localhost:4000/users";
        fetch(url)
        .then(response => response.json())
        .then(data => 
        dispatch({type: "Userlist/setUserlist",payload: data,}));
    }, []
    )

    function redirection() {
        if (User.registred === 'false')
        {
            setCustom(true);
        }
        else if (User.registred === 'true')
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