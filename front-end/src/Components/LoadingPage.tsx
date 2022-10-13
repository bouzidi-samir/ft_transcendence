import { redirect } from "react-router"
import { useEffect } from "react";
import Particle from "./Particle";
import Home from "../Containers/Home";
import { useParams, Navigate, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Components/Share/LoadingPage.css"
import NewMemberSet from "./ProfilSettings/NewMemberSet";


export default function LoadingPage (props : any) {

    const {redirection} = props;
    const User = useSelector((state: any) => state.User);
    let navigation = useNavigate();
    const dispatch = useDispatch();

    useEffect( () => {    
        let url : string = "http://localhost:4000/users";
        fetch(url)
        .then(response => response.json())
        .then(data =>  dispatch({type: "Userlist/setUserlist",payload: data,}));
    }, []
    )

    function redirect() {

       setTimeout(() => {
            navigation("/Home");
        }, 3000);
    }

    return (
        <div className="loading-content">
        <>
            <Particle/>
            <h1 className="loading-title">loading...</h1>
                {User.registred === 'true' ? redirect() : <NewMemberSet/> }
        </>
        </div>
    )
}