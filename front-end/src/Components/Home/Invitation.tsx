import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";

export default function Invitation() {

    const User = useSelector((state: any) => state.User);
    const values = Object.values(User.JWT_token);
    const [invitations, setInvitations] = useState([]);
    const dispatch = useDispatch();
    let navigate = useNavigate();


    async function handleInvitation() {

            let url = "http://localhost:4000/chat/checkRoomInvitation";
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${values[0]}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            toUsername: User.username,
            roomRequest: true,
            })
        }
        ).then(response => response.json()).then(data => setInvitations(data));
        console.log("room invitation", invitations);
        console.log('User', User.username)
        }
        
        useEffect(() => {
            handleInvitation();
        }, []);

        async function handleAccept(invit: any)  {
            console.log('accept')
            let url = "http://localhost:4000/chat/acceptOneRoomInvitation";
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${values[0]}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username:  User.username,
            fromUsername:invit.fromUSername,
            tag: invit.roomTag,
            })
        }
        ).then(response => response.json())
            console.log('accept response', response); 
        handleInvitation();
        navigate(`/Chat`);
        dispatch({type: "RoomActive/setRoomActive",payload: {tag:invit.roomTag}})

        }

        async function handleRefuse(invit: any)  {
            console.log('accept')
            let url = "http://localhost:4000/chat/refuseOneRoomInvitation";
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${values[0]}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username:  User.username,
            fromUsername:invit.fromUSername,
            tag: invit.roomTag,
            })
        }
        ).then(response => response.json())
            console.log('refuse response', response); 
        handleInvitation();
        }
    

    return (
        <div className='notifs-content'>
            <p style={{color: "yellow"}}>Invitations</p>
            { invitations.length > 0 ? (
                invitations.map((invit: any) => (
                    <div key={invit.id}>
                    <p>Chat invitation from : {invit.fromUsername + ' ' }
                    <button  onClick={() => handleAccept(invit)}>Accepter</button>
                    <button  onClick={()=> handleRefuse(invit)}>Refuser</button>
                    </p> 
                    </div>  
                    ))) : (null)
            }
        </div>
        );
}
            
            
        

