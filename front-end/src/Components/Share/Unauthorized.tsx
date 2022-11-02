import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import "../../styles/Components/Share/Cross.css"
import Particle from "../Particle"

export default function Unauthorized(props: any) {

    let navigation = useNavigate();

    return (
        <div className="loading-content">
        <>
        <Particle/>
        
        <h1 className="loading-titleA"> 401 </h1>
        <h1 className="loading-titleB"> Non Autorisé </h1>
        <Link to="/"> <button className="btn btn-primary">Retour</button></Link>
           
        </>
        </div>
    )
} 