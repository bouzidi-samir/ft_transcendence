import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { io, Socket } from "socket.io-client";


export default function GameLauncher(props: any) {
    const location = useLocation();
    const User = useSelector((state: any) => state.User);
    const [time , setTime] = useState(0);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser]  = useState(User);
    const {hostname} = document.location;
    const [socket, setSocket] = useState<Socket>();
    const [alertGame, setAlertGame] = useState<string>("");
    let userUpdate = {...User};
    const invitation = {
        fromUsername: User.username,
        toUsername: props.player2.username,
    };
    let client: Client = new Colyseus.Client(`ws://${hostname}:4000`);
    const player1 = invitation.fromUsername
    const player2 = invitation.toUsername;

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


    async function sendInvitation() {
        let response= await fetch(`http://${hostname}:4000/users/search/${player2}`, {headers: {
             'Authorization': `Bearer ${User.JWT_token}`,
             'Content-Type': 'application/json',
             'cors': 'true'
        }})
        let player2Data = await response.json();
        if ((player2Data.ello - User.ello > 50) || (player2Data.ello - User.ello < -50))
        {
            //POPUP pour dire qu il n est pas possible de jouer avec ce joueur car trop grande difference d ello.
        }
        else {
            response= await fetch(`http://${hostname}:4000/chat/gameInvitation`, {method: "POST", headers: {
                'Authorization': `Bearer ${User.JWT_token}`,
                'Content-Type': 'application/json',
                'cors': 'true'
            },
            body: JSON.stringify({
                fromUsername: User.username,
                toUsername: props.player2.username,
            })
            })
            let result = await response.json();
            console.log(result);
            socket?.emit("invitationGame", invitation);
        }
    }

    useEffect(()=>{
        createGame();
    },[alertGame])


    async function createGame()
    {
        console.log("createGame");
        if (alertGame ==  "OK")
        {
            console.log("le player2 est OK pour jouer");
            let room = await client?.create("private_room", {});
            room.send("clientName", {player1 : player1});
                room.onMessage("createRoom", async (message) => {
                    userUpdate.room = await client?.create("my_room", {}); 
                    dispatch({
                        type : "User/setUser",
                        payload: userUpdate
                    });
                    room.send("gameId", {id: userUpdate.room.id});
                    room.leave();
                    navigation('/game');
                }
            )
        }
        if (alertGame ==  "KO")
        {
            console.log("le player2 est KO (pas OK) pour jouer");
            // POP UP POUR DIRE QUE LE JOUEUR A REFUSE
        }
    }

    return (
        <div className='user-icon-game'onClick={sendInvitation}>
        </div> 
    )

}