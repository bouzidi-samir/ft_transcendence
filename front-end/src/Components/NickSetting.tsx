import "../styles/Components/NickSetting.css"
import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import UserContext from "../Context/userContext";

export default function AvatarSetting(props : any) {

    const {user, setUser} = useContext(UserContext);
    const [avatar, setAvatar] = useState<File>();

    const handleChange = async (e: any) => setAvatar(e.target.files[0])

    async function handleForm() {
  
    } 

    return (
        <form className="setavatar-content">
            <input type='file' onChange={handleChange} ></input>
            <br></br>
                <Link to="/ProfilSettings">
                    <button onClick={handleForm} className="btn btn-primary">Valider</button>
                </Link>
        </form>
    )
}