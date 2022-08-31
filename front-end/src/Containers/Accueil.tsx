import "../styles/Containers/Accueil.css"
import React, {useState, useContext, useEffect,} from "react";
import Custom from "../Components/Custom";
import UserContext from "../Context/userProfilContext";
import { useParams } from "react-router";


export default function Accueil(props: any) {
    const {user, setUser} = useContext(UserContext);
    const [custom, setCustom] = useState(false);
    const [newMenber, setNewMenber] = useState(true);
    const username = useParams();
    console.log(username.username);

    useEffect(() => {

        const request = fetch(`http://localhost:4000/user/:sbouzidi`)
            .then(response => response.json()
            .then((response) => {
                console.log(response);
            }))
            request.catch(e => {console.error(e)})
            return () => {}
        }, [])
      
      
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