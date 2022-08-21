import "../styles/Containers/Accueil.css"
import React, {useState} from "react";
import Custom from "../Components/Custom";

export default function Accueil() {

    const [custom, setCustom] = useState(false);
    const [newMenber, setNewMenber] = useState(true);

    function redirection() {
        if (newMenber == true)
            setCustom(true);
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
            
            : <Custom/>}
            <div className="pong" data-aos="fade-down" data-aos-duration="2000"></div>
        </div>
        </>
    )
}