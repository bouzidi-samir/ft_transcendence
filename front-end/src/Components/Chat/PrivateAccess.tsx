
import { Room } from "../../Slices/RoomSlice"
import "../../styles/Components/Chat/PrivateAccess.css"


export default function PrivateAcces(props : any) {
   const {setPrivate} = props;

    return (
        <form className="privateAccess">
            <div onClick={()=>setPrivate(false)} className="cross-private"></div>
            <label>Veuillez saisir le mot de passe pour rejoindre ce salon:</label>
            <input type="password"></input>
            <button className="btn btn-primary">Valider</button>
        </form>
    )
}