import "../../styles/Components/ProfilSettings/AvatarSetting.css"
import { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux';

export default function NewMemberAvatar(props : any) {
    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState<File>();
    const handleChange = async (e: any) => setAvatar(e.target.files[0])

    async function handleForm(e: any) {
        e.preventDefault();
        if (!avatar){
            props.setAvatarform(false);
            return; 
        }
        const formData = new FormData();
        formData.append("file", avatar, avatar.name);
        let reponse = await fetch(
			`http://localhost:4000/users/${User.id}/upload`,
			{
				method: "POST",
				headers: {},
				body: formData,
			}
		).then(res => res.json())
        dispatch({type: "User/setUser",payload: reponse,});
        props.setAvatarform(false);
    } 

    return (
        <form className="setavatar-content">
            <input type='file' accept="image/*" multiple={false}  onChange={handleChange} ></input>
            <br></br>       
                    <button onClick={handleForm} className="btn btn-primary newbtn">ok</button>            
        </form>
    )
}