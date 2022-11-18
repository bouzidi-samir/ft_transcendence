import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router";
import { useState } from "react";


export default function TfaButton () {

    const User = useSelector((state: any) => state.User);
    const dispatch = useDispatch();
    const user_id = useParams();
    const [user, setUser]  = useState(User);
    const [twofactor, setTwoFactor]  = useState(false);
    const navigate = useNavigate();

    async function TfaSwitch(e : any) // changer l affichage selon si c est active ou non et pas un clic
    {
        console.log("here");
        let userUpdate = {...User};
        if (User.TFOenabled === true)
            userUpdate.TFOenabled = false;
        else
            userUpdate.TFOenabled = true;
        dispatch({
            type : "User/setUser",
            payload: userUpdate
        })
        console.log(user.JWT_token);
        const request = await fetch(`http://localhost:4000/2fa/switch`, { // A remplacer avec le user
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${User.JWT_token}`
            },
            body: JSON.stringify({userId : user.id })
        })
        console.log("herepast");
        if (userUpdate.TFOenabled === true)
        {
            console.log('/qrcode')
            return (navigate("/qrcode"));
        }
        else
        {
            console.log('/home')
            return (navigate("/home"));
        }
    }
   
    return(
     <>   
         <p className="tfa-p">Double Authentification:</p>
        <label className="switch">
        <input type="checkbox" onClick={TfaSwitch} defaultChecked={User.TFOenabled == true}/>
        <span className="slider round"></span>
        </label>
    </>
)
}






   