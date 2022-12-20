import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { SocketContext } from '../../Context/socket';

export default function Invitation() {
    const {hostname} = document.location;
    const User = useSelector((state: any) => state.User);
    const [invitations, setInvitations] = useState([]);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    // const [socket, setSocket] = useState<Socket>();
    const [alertInvit, setAlertInvit] = useState<string>("");
    const socket = useContext(SocketContext);

    async function handleInvitation() {

            let url = `http://${hostname}:4000/chat/checkRoomInvitation`;
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            toUsername: User.username,
            roomRequest: true,
            })
        }
        ).then(response => response.json()).then(data => setInvitations(data));
        }

        // useEffect(() => {
        //     const newSocket = io(`http://${hostname}:8000`);
        //     setSocket(newSocket)
        // }, [setSocket])
    
        const invitationListener = (alert: string) => {
            setAlertInvit(alert);
        }
    
        useEffect(() => {
            socket?.on("roomInvitationServer", invitationListener );
            return () => {
                socket?.off("roomInvitationServer", invitationListener )
            }
        }, [invitationListener])
        
         useEffect(() => {
             handleInvitation();
         }, []);

        useEffect(() => {
            handleInvitation();
        }, [alertInvit]);

        async function handleAccept(invit: any)  {
            let url = `http://${hostname}:4000/chat/acceptOneRoomInvitation`;
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username:  User.username,
            nickname: invit.nickname,
            fromUsername:invit.fromUSername,
            avatar_url: User.avatar_url,
            tag: invit.roomTag,
            })
        }
        )
        handleInvitation();
        navigate(`/Chat`);
        dispatch({type: "RoomActive/setRoomActive",payload: {tag:invit.roomTag}})

        }

        async function handleRefuse(invit: any)  {
            let url = `http://${hostname}:4000/chat/refuseOneRoomInvitation`;
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username:  User.username,
            fromUsername:invit.fromUSername,
            tag: invit.roomTag,
            })
        }
        )
        handleInvitation();
        }
    

    return (
        <div className='notifs-content'>
            <h2>Invitations</h2>
            <hr></hr>
            { invitations.length > 0 ? (
                invitations.map((invit: any, key: any) => (
                    invit.toUsername == User.username ?
                        <div className="invit-block" key={invit.id + key}>
                            <p>Chat invitation from : {invit.fromUsername + ' ' }
                            <button  onClick={() => handleAccept(invit)}>Accepter</button>
                            <button  onClick={()=> handleRefuse(invit)}>Refuser</button>
                            </p> 
                        </div>
                        : null  
                    ))) : (null)
            }
        </div>
        );
}