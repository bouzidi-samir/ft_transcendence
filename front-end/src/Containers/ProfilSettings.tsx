import "../styles/Containers/ProfilSettings.css"
import Navbar from "../Components/Share/Navbar";
import FormSetting from "../Components/ProfilSettings/FormSetting";
import { useEffect, useState } from "react";

export default function ProfilSettings() {
    
    const [userlist , setUserlist] = useState();

    useEffect( () => {
         
        let url : string = "http://localhost:4000/users";
        fetch(url)
        .then(response => response.json())
        .then(data => setUserlist(data));
    }, []
    )

    return (
        <>
        <Navbar></Navbar>
        <div className="profilset-content">
            <FormSetting userlist={userlist} />
        </div>
        </>
    );
}