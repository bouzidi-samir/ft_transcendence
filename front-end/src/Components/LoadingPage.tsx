import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Components/Share/LoadingPage.css"
import NewMemberSet from "./ProfilSettings/NewMemberSet";
import TFAset from './ProfilSettings/TFAset'


export default function LoadingPage (props : any) {

    const User = useSelector((state: any) => state.User);
    const [time , setTime] = useState(0);
    let navigation = useNavigate();
    const dispatch = useDispatch();

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
            {setTimeout(() => {
                User.registred === 'true' ? redirect() : User.TFOenabled === true ? <TFAset /> : <NewMemberSet/>
            }, 100) 
        }
            {User.registred === 'false' ? <NewMemberSet/> :   <h1 className="loading-title">{time}%</h1> }

        </>
        </div>
    )
}