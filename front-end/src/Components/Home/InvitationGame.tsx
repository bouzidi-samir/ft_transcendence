import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { io, Socket } from "socket.io-client";

export default function InvitationGame() {

    const User = useSelector((state: any) => state.User);
    const values = Object.values(User.JWT_token);
    const [invitations, setInvitations] = useState([]);
    const [socket, setSocket] = useState<Socket>();
    const [alertGame, setAlertGame] = useState<string>("");
    const acceptGame =  "OK";
    const refuseGame = "KO";


    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket)
    }, [setSocket])


    const alertListener = (alertGame: string) => {
        setAlertGame(alertGame);
    }
    
    useEffect(() => {
        socket?.on("invitationGameServer", alertListener);
        return () => {
            socket?.off("invitationGameServer", alertListener)
        }
    }, [alertListener])

    async function handleInvitation() {

            let url = "http://localhost:4000/chat/checkGameInvitation";
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            toUsername: User.username,
            gameRequest: true,
            })
        }
        ).then(response => response.json()).then(data => setInvitations(data));
        }
        
        useEffect(() => {
            handleInvitation();
        }, [alertGame]);

        async function handleAccept(invit: any)  {
            console.log('accept')
            let url = "http://localhost:4000/chat/acceptOneGameInvitation";
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username:  User.username,
            fromUsername:invit.fromUSername,
            })
        }
        ).then(response => response.json())
        handleInvitation();
        socket?.emit("acceptGame", acceptGame);

        }

        async function handleRefuse(invit: any)  {
            console.log('accept')
            let url = "http://localhost:4000/chat/refuseOneGameInvitation";
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username:  User.username,
            fromUsername:invit.fromUSername,
            })
        }
        ).then(response => response.json())
            console.log('refuse response', response); 
        handleInvitation();
        socket?.emit("refuseGame", refuseGame);

        }
    
    return (
        <div className='notifs-content'>
            { invitations.length > 0 ? (
                invitations.map((invit: any) => (
                    invit.toUsername == User.username ?
                        <div key={invit.id}>
                        <p>Game invitation from : {invit.fromUsername + ' ' }
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
      