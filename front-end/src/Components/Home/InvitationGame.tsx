import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "../../Context/socket";

export default function InvitationGame() {

    const User = useSelector((state: any) => state.User);
    const values = Object.values(User.JWT_token);
    const [invitations, setInvitations] = useState([]);
    // const [socket, setSocket] = useState<Socket>();
    const [alertGame, setAlertGame] = useState<string>("");
    let acceptGame =  "OK";
    const refuseGame = "KO";

    const socket = useContext(SocketContext);

    // useEffect(() => {
    //     const newSocket = io('http://localhost:8000');
    //     setSocket(newSocket)
    // }, [setSocket])


    const alertListener = (alert: string) => {
        setAlertGame(alert);
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
            'Authorization': `Bearer ${values[0]}`,
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
            let url = "http://localhost:4000/chat/acceptOneGameInvitation";
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${values[0]}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username:  User.username,
            fromUsername:invit.fromUsername,
            })
        }
        ).then(response => response.json())
        handleInvitation();
        const acceptGame = {
            // toUsername:  User.username,
            fromUsername: invit.fromUsername,
            text: "OK"
            };
        socket?.emit("acceptGame", acceptGame)

        }

        async function handleRefuse(invit: any)  {
            let url = "http://localhost:4000/chat/refuseOneGameInvitation";
            const response = await fetch(url, {method: "POST",
            headers: {
            'Authorization': `Bearer ${values[0]}`,
            'Content-Type': 'application/json',
            'cors': 'true'
        },
        body: JSON.stringify({
            username:  User.username,
            fromUsername: invit.fromUsername,
            })
        }
        ).then(response => response.json())
            console.log('refuse response', response); 
        handleInvitation();
        const refuseGame = {
            // toUsername:  User.username,
            fromUsername: invit.fromUsername,
            text: "KO"
            };
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
            
            