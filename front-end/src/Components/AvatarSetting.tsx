import "../styles/Components/AvatarSetting.css"
import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import UserContext from "../Context/userContext";

export default function AvatarSetting(props : any) {

    const {user, setUser} = useContext(UserContext);
    const [avatar, setAvatar] = useState<File>();

    const handleChange = async (e: any) => setAvatar(e.target.files[0])

    async function handleForm() {
        if (!avatar)
			return; 
        const formData = new FormData();
        formData.append("file", avatar, avatar.name);
        let reponse = await fetch(
			`http://localhost:4000/users/${user.id}/avatar`,
			{
				method: "POST",
				headers: {},
				body: formData,
			}
		).then(res => res.json())
       // props.setAvatarform(false);
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