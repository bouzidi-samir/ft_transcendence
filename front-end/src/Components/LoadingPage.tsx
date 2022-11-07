import { redirect } from "react-router"
import { useEffect, useState } from "react";
import Particle from "./Particle";
import Home from "../Containers/Home";
import { useParams, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Components/Share/LoadingPage.css"
import NewMemberSet from "./ProfilSettings/NewMemberSet";
import TFAset from './ProfilSettings/TFAset'


export default function LoadingPage (props : any) {

    const {redirection} = props;
    const User = useSelector((state: any) => state.User);
    const [time , setTime] = useState(0);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser]  = useState(User);

    useEffect( () => {  
        let url : string = "http://localhost:4000/users";
        fetch(url)
        .then(response => response.json())
        .then(data =>  dispatch({type: "Userlist/setUserlist",payload: data,}));
    }, []
    )

    useEffect( () => {    
        setInterval(() => {
            setTime(time => time + 1);
        },100)
    }, []
    )

    function redirect() {

       setTimeout(() => {
            navigation("/Home");
        }, 1000);
    }

    return (
        <div className="loading-content">
        <>
            <Particle/>
            
            <h1 className="loading-title">{time}%</h1>
            {User.registred === 'true' ? redirect() : User.TFOenabled === true ? <TFAset /> : <NewMemberSet/> }
        </>
        </div>
    )
}