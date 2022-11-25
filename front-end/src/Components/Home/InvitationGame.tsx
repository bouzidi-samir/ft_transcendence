import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

export default function InvitationGame() {

    const User = useSelector((state: any) => state.User);
    const values = Object.values(User.JWT_token);
    const [invitations, setInvitations] = useState([]);
    const [socket, setSocket] = useState<Socket>();
    const [alertGame, setAlertGame] = useState<string>("");
    const acceptGame =  "OK";
    const refuseGame = "KO";
    let navigation = useNavigate();
    const dispatch = useDispatch();


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
        let client: Client = new Colyseus.Client(`ws://localhost:4000`);
        async function join ()
                    {
                        let rooms;
                        let room : Colyseus.Room<unknown>;
                        let userUpdate = {...User};
                        rooms = await client.getAvailableRooms("private_room")
                        for (let i = 0; i < rooms.length; i++)
                        {
                            if (rooms[i].metadata.player1 === invit.fromUSername)
                            {
                                room = await client?.joinById(rooms[i].roomId, {});
                                room.send("joined", {});
                                room.onMessage('joinRoom', async (message) => {
                                    userUpdate.room = await client?.joinById(message.id, {});
                                    dispatch({
                                        type : "User/setUser",
                                        payload: userUpdate
                                    });
                                    room.leave();
                                    navigation('/game');
                                })
                            }
                        }
                    }
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
      