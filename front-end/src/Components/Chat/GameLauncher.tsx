import * as Colyseus from "colyseus.js";
import { Client } from "colyseus.js";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { io, Socket } from "socket.io-client";


export default function GameLauncher(props: any) {
    const location = useLocation();
    const User = useSelector((state: any) => state.User);
    // const [time , setTime] = useState(0);
    let navigation = useNavigate();
    const dispatch = useDispatch();
    // const [user, setUser]  = useState(User);
    const {hostname} = document.location;
    const [socket, setSocket] = useState<Socket>();
    const [alertGame, setAlertGame] = useState<any>({});
    // let userUpdate = {...User};
    const invitation = {
        fromUsername: User.username,
        toUsername: props.player2.username,
    };
    let client: Client = new Colyseus.Client(`ws://${hostname}:4000`);
    const player1 = User.username;
    const player2 = props.player2.username;
    let room : Colyseus.Room<unknown>;

    useEffect(() => {
        const newSocket = io(`http://${hostname}:8000`);
        setSocket(newSocket)
    }, [setSocket])

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
        {
            alert('invitation impossible');
            //POPUP pour dire qu il n est pas possible de jouer avec ce joueur car trop grande difference d ello.
        }
        /*else 
        {
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
        } */   
        socket?.emit("invitationGame", invitation);
    }

    useEffect(()=>{
        createGame();
    },[alertAnswer])

    async function createGame()
    {
        
        if (alertGame.fromUsername == User.username && alertGame.text ==  "OK"){
        //if (alertGame.text ==  "OK"){
           // room = room = await client?.create("private_room", {});
          //  room.send("clientName", {player1 : player1});
            console.log('alertGame', alertGame)
            console.log("le player2 est OK pour jouer");
            setAlertGame({})
            let client: Client = new Colyseus.Client(`ws://localhost:4000`);
            let rooms;
            let userUpdate = {...User};
            let room = await client?.joinById(alertGame.id, {}); 
            room.onMessage("joinRoom", async (message)  => {
                userUpdate.room = await client?.joinById(message.id, {});
                await dispatch({
                    type : "User/setUser",
                    payload: userUpdate
                });
                room.leave();
                navigation('/game'); 
            })
        }
        // if (alertGame.fromUsername == User.username && alertGame.text ==  "KO"){
        if (alertGame.text ==  "KO"){
        console.log('alertGame', alertGame)
        console.log("le player2 est KO (pas OK) pour jouer");
        setAlertGame({})
            // POP UP POUR DIRE QUE LE JOUEUR A REFUSE
        }
    }

    return (
        <div className='user-icon-game'onClick={sendInvitation}>
        </div> 
    )

}