import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import "../styles/Components/Share/LoadingPage.css"
import NewMemberSet from "./ProfilSettings/NewMemberSet";
import TFAset from './ProfilSettings/TFAset'


export default function LoadingPage (props : any) {
    const User = useSelector((state: any) => state.User);
    const [time , setTime] = useState(0);
    let navigation = useNavigate();
    const {hostname} = document.location;
   
    useEffect( () => {   
        setInterval(() => {
            setTime(time => time + 1);
        },100)
    }, []
    )

    function redirect() {
       setTimeout(() => {
        if (User.registred !== "false")
            navigation("/Home");
        }, 1500);
    }

    return (
        <div className="loading-content">
        <>  
            {User.TFOenabled === true ? <TFAset /> : null}
            {setTimeout(() => {
                User.registred === 'true' && User.TFOenabled === false ? redirect() : <NewMemberSet/>
            }, 100) 
            }
            {User.registred === 'false' ? <NewMemberSet/> :   <h1 className="loading-title">{time}%</h1> }

        </>
        </div>
    )
}