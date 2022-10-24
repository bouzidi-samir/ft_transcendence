import { redirect } from "react-router"
import { useEffect, useState } from "react";
import Particle from "./Particle";
import Home from "../Containers/Home";
import { useParams, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Components/Share/MatchingPage.css"
import NewMemberSet from "./ProfilSettings/NewMemberSet";
import TFAset from './ProfilSettings/TFAset'


export default function MatchingPage (props : any) {

    const {redirection} = props;
    const User = useSelector((state: any) => state.User);
    const [time , setTime] = useState(0);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser]  = useState(User);

    useEffect( () => {
        
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
            
            <form className = 'form-newsetting'>
            <button className="SingleButton">Single player.</button>
            <button className="MultiButton">Multiplayer.</button>
            </form>

                
        </>
        </div>
    )
}