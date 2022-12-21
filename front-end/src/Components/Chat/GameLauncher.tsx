import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { io, Socket } from "socket.io-client";
import { SocketContext } from '../../Context/socket';


export default function GameLauncher(props: any) {
    const location = useLocation();
    const User = useSelector((state: any) => state.User);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const {hostname} = document.location;
    const [alertGame, setAlertGame] = useState<any>({});
    const invitation = {
        fromUsername: User.username,
        toUsername: props.player2.username,
    };
    let client: Client = new Colyseus.Client(`ws://${hostname}:4000`);
    const player1 = User.username;
    const player2 = props.player2.username;
    let room : Colyseus.Room<unknown>;

    const socket = useContext(SocketContext);

    // useEffect(() => {
    //     const newSocket = io(`http://${hostname}:8000`);
    //     setSocket(newSocket)
    // }, [setSocket])

    const alertAnswer = (answer: any) => {
        setAlertGame(answer);
    }
    
    useEffect(() => {
        socket?.on( "acceptGameServer",   alertAnswer);
        socket?.on( 'refuseGameServer',   alertAnswer);
        return () => {
            socket?.off("acceptGameServer",  alertAnswer);
            socket?.off("refuseGameServer",  alertAnswer);
        }
    }, [alertAnswer])


    async function sendInvitation() {
        
        let response= await fetch(`http://${hostname}:4000/chat/gameInvitation`, {method: "POST", headers: {
            'Authorization': `Bearer ${User.JWT_token}`,
            'Content-Type': 'application/json',
            'cors': 'true'
          },
          body: JSON.stringify({
            senderName: User.username,
            receiverName: props.player2.username,
              })
          })
        let player2Data = await response.json();
        if ((player2Data.ello - User.ello > 50) || (player2Data.ello - User.ello < -50))
            alert('Trop de difference de niveau pour jouer avec ce joueur.');
        socket?.emit("invitationGame", invitation);
    }

    useEffect(()=>{
        createGame();
    },[alertAnswer])

    async function createGame()
    {
        
        if (alertGame.fromUsername == User.username && alertGame.text ==  "OK"){
            setAlertGame({})
            let client: Client = new Colyseus.Client(`ws://${hostname}:4000`);
            let rooms;
            let userUpdate = {...User};
            let room = await client?.joinById(alertGame.id, {access_token : User.JWT_token}); 
            room.onMessage("joinRoom", async (message)  => {
                userUpdate.room = await client?.joinById(message.id, {access_token : User.JWT_token});
                userUpdate.status = "In Game";
                await dispatch({
                    type : "User/setUser",
                    payload: userUpdate
                });
                room.leave();
                navigation('/game'); 
            })
        }
        if (alertGame.text ==  "KO"){
            setAlertGame({})
        }
    }

    return (
        <div className='user-icon-game'onClick={sendInvitation}>
        </div> 
    )

}