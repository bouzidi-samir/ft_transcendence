import { redirect } from "react-router"
import { useEffect, useState } from "react";
import Particle from "./Particle";
import Home from "../Containers/Home";
import { useParams, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Components/Share/MatchingPage.css"
import NewMemberSet from "./ProfilSettings/NewMemberSet";
import TFAset from './ProfilSettings/TFAset'
import Navbar from "./Share/Navbar";
import { Link } from "react-router-dom";


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
            <Navbar />
            
            <form className = 'form-newsetting'>
            <Link to="/game" className="SingleButton">Single player.</Link>
            <Link to ="/game2" className="MultiButton">Multiplayer.</Link>
            </form>

                
        </>
        </div>
    )
}