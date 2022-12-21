
import "../styles/Containers/ProfilSettings.css"
import Navbar from "../Components/Share/Navbar";
import FormSetting from "../Components/ProfilSettings/FormSetting";
import {useNavigate } from "react-router";
import { useEffect} from "react";
import { useSelector } from "react-redux";

export default function ProfilSettings() {
    let navigation = useNavigate();
    const User = useSelector((state: any) => state.User);
    const {hostname} = document.location;

    const checkGuard = async () =>
	{
		let url_ = `http://${hostname}:4000/games/checkGuard`;
        await fetch(url_, {method: "POST",
        headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
        username: User.username,
        })
        })
		.then((response) => {
			if (response.status === 401)
				throw new Error()
		})
	}


    useEffect( () => {
        checkGuard().catch(() =>
		{
			navigation('/Unauthorized')
		})
     }, []
     )


    return (
        <>
        <Navbar></Navbar>
        <div className="profilset-content">
            <FormSetting/>
        </div>
        </>
    );
}